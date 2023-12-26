document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contactForm");
    const loadingMessage = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error_message");
    const sentMessage = document.querySelector(".sent_message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Fetch the form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        console.log(name, email, phone, message);

        // Show loading message
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';

        try {
            // Make a POST request to your server
            const response = await fetch("http://localhost:4000/create", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone,  message }),
            });

            if (response.ok) {
                // Update UI based on server response
                sentMessage.style.display = 'block';
            } else {
                // If the server returns an error, handle it
                throw new Error(`Server responded with ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            errorMessage.style.display = 'block';
        } finally {
            // Hide loading message
            loadingMessage.style.display = 'none';
        }
    });
});
