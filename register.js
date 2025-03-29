document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            age: document.getElementById("age").value,
            phone: document.getElementById("phone").value
        };

        // Send data to backend (replace with your actual server URL)
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            responseMessage.textContent = data.message;
            responseMessage.style.color = "green";
            form.reset();
        })
        .catch(error => {
            responseMessage.textContent = "Error registering. Please try again.";
            responseMessage.style.color = "red";
        });
    });
});
