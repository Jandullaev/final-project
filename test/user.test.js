// document.addEventListener("DOMContentLoaded", () => {
//     test("Contact Form", () => {
//         let form;
//         let loadingMessage;
//         let errorMessage;
//         let sentMessage;
//
//         beforeEach(() => {
//             // Set up the HTML elements
//             document.body.innerHTML = `
//         <form class="contactForm" method="post" action="http://localhost:5500/create">
//             <div class="email_form_input">
//                     <input
//                       id="name"
//                       type="text"
//                       name="name"
//                       class="form-control"
//                       placeholder="Name"
//                       required
//                     />
//                   </div>
//
//                   <div class="email_form_input">
//                     <input
//                       id="email"
//                       type="email"
//                       class="form-control"
//                       name="email"
//                       placeholder="Email"
//                       required
//                     />
//                   </div>
//
//                   <div class="email_form_input">
//                     <input
//                       id="phone"
//                       type="text"
//                       class="form-control"
//                       name="phone"
//                       placeholder="Phone"
//                       value="(+998) "
//                       required
//                     />
//                   </div>
//
//                   <div class="email_form_input">
//                     <textarea
//                       id="message"
//                       class="form-control"
//                       name="message"
//                       rows="6"
//                       placeholder="Message"
//                       required
//                     ></textarea>
//                   </div>
//
//                   <div class="email_form_input text-center">
//                     <div class="loading">Loading</div>
//                     <div class="error_message">Error Submitting</div>
//                     <div class="sent_message">
//                       Your quote request has been sent successfully. Thank you!
//                     </div>
//
//                     <button class="btn" id="submit" type="submit">
//                       Submit
//                     </button>
//                   </div>
//         </form>
//       `;
//
//             form = document.querySelector(".contactForm");
//             loadingMessage = document.querySelector(".loading");
//             errorMessage = document.querySelector(".error_message");
//             sentMessage = document.querySelector(".sent_message");
//         });
//
//         test("Form submission", async () => {
//             // Mock fetch function
//             // eslint-disable-next-line no-undef
//             global.fetch = jest.fn(() =>
//                 Promise.resolve({
//                     ok: true,
//                     json: () => Promise.resolve({}),
//                 })
//             );
//
//             // Set up form values
//             document.getElementById("name").value = "John Doe";
//             document.getElementById("email").value = "john.doe@example.com";
//             document.getElementById("phone").value = "123456789";
//             document.getElementById("message").value = "Hello, this is a test message.";
//
//             // Trigger form submission
//             form.dispatchEvent(new Event("submit", { bubbles: true }));
//
//             // Wait for promises to resolve
//             await new Promise((resolve) => setTimeout(resolve));
//
//             // Check that loading message is hidden
//             expect(loadingMessage.style.display).toBe("none");
//
//             // Check that error message is hidden
//             expect(errorMessage.style.display).toBe("none");
//
//             // Check that sent message is displayed
//             expect(sentMessage.style.display).toBe("block");
//
//             // Check that fetch function was called with the correct arguments
//             expect(fetch).toHaveBeenCalledWith("http://localhost:4000/create", {
//                 method: "POST",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: "John Doe",
//                     email: "john.doe@example.com",
//                     phone: "123456789",
//                     message: "Hello, this is a test message.",
//                 }),
//             });
//         });
//     });
// });
