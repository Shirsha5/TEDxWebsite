document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            age: document.getElementById("age").value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || "",
            mitStudent: document.querySelector('input[name="mitStudent"]:checked')?.value || "",
            college: document.getElementById("college")?.value || ""
        };

        // Send data to backend
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            responseMessage.textContent = data.message;
            responseMessage.style.color = "green";

            // If ticket URL exists, show link and auto-download
            if (data.ticketUrl) {
                // Show download link
                const link = document.createElement("a");
                link.href = data.ticketUrl;
                link.textContent = "Download Ticket 🎫";
                link.target = "_blank";
                link.style.display = "block";
                link.style.marginTop = "10px";
                responseMessage.appendChild(link);

                // Auto download
                const autoDownloadLink = document.createElement("a");
                autoDownloadLink.href = data.ticketUrl;
                autoDownloadLink.download = "TEDx_Ticket.pdf";
                document.body.appendChild(autoDownloadLink);
                autoDownloadLink.click();
                document.body.removeChild(autoDownloadLink);
            }

            form.reset();
        })
        .catch(error => {
            responseMessage.textContent = "Error registering. Please try again.";
            responseMessage.style.color = "red";
        });
    });
});
