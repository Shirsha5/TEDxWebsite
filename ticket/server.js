const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const { chromium } = require("playwright");
const QRCode = require("qrcode");
const ejs = require("ejs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TICKETS_DIR = path.join(__dirname, "tickets");
fs.ensureDirSync(TICKETS_DIR);

app.post("/register", async (req, res) => {
  const { name, email, phone, age, gender, mitStudent, college } = req.body;
  const serial = `TEDX-${Date.now()}`;

  try {
    // Generate QR code
    const qrDataUrl = await QRCode.toDataURL(`${name}-${serial}`);

    const htmlTemplatePath = path.join(__dirname, "ticket.html");
const cssPath = path.join(__dirname, "ticket.css");

    
    // Load and render HTML
    const htmlTemplate = await fs.readFile(htmlTemplatePath, "utf8");
    const htmlWithUserData = ejs.render(htmlTemplate, {
        name,
        email,
        phone,
        age,
        gender,
        mitStudent,
        college,
        serial,
        qrDataUrl,
    });
    console.log(htmlWithUserData);

    const cssContent = await fs.readFile(cssPath, "utf8");

    // Use Playwright to generate PDF
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.setContent(
      `
            <style>${cssContent}</style>
            ${htmlWithUserData}
            `,
      { waitUntil: "domcontentloaded" }
    ); // or remove waitUntil entirely

    const pdfPath = path.join(TICKETS_DIR, `${serial}.pdf`);
    await page.pdf({ path: pdfPath, format: "A4" });

    await browser.close();

    console.log(`✅ Ticket generated: ${serial} -> ${pdfPath}`);
    // Send download link
    res.json({
      message: "Ticket generated successfully!",
      downloadLink: `/tickets/${serial}.pdf`,
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Failed to generate ticket." });
  }
});

// Serve generated PDFs
app.use("/tickets", express.static(TICKETS_DIR));
app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000")
);
