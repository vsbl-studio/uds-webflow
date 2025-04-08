export default function () {
    const mailerliteForm = document.getElementById("wf-form-Newsletter-Form");

    if (mailerliteForm) {
        const newsletterSuccess = document.getElementById("newsletter-success");
        const newsletterError = document.getElementById("newsletter-error");
        const newsletterSubmit = document.querySelector(".newsletter-submit");

        const emailInput = document.getElementById("Subscriber-Email");
        const privacyCheckbox = document.getElementById(
            "Newsletter-Privacy-Policy"
        );

        const emailRequired = document.getElementById("email-required");
        const privacyRequired = document.getElementById(
            "newsletter-privacy-error"
        );

        if (emailInput) {
            emailInput.addEventListener("input", function () {
                emailRequired.style.display = "none";
                newsletterSuccess.style.display = "none";
                newsletterError.style.display = "none";
            });
        }

        if (privacyCheckbox) {
            privacyCheckbox.addEventListener("change", function () {
                privacyRequired.style.display = "none";
                newsletterSuccess.style.display = "none";
                newsletterError.style.display = "none";
            });
        }
        if (newsletterSubmit) {
            newsletterSubmit.addEventListener("click", function (e) {
                e.preventDefault();

                let isValid = true;

                emailRequired.style.display = "none";
                privacyRequired.style.display = "none";
                newsletterSuccess.style.display = "none";
                newsletterError.style.display = "none";

                if (!privacyCheckbox.checked) {
                    isValid = false;
                    privacyRequired.style.display = "flex";
                }

                if (emailInput.value.trim() === "") {
                    emailRequired.style.display = "flex";
                    isValid = false;
                }

                const data = {
                    email: emailInput.value,
                };

                if (isValid) {
                    submitHubspotForm(emailInput.value);

                    // fetch("https://connect.mailerlite.com/api/subscribers", {
                    //     method: "POST",
                    //     headers: {
                    //         "Content-Type": "application/json",
                    //         Authorization:
                    //             "Bearer ",
                    //     },
                    //     body: JSON.stringify(data),
                    // })
                    //     .then((response) => {
                    //         if (!response.ok) {
                    //             throw new Error(
                    //                 `HTTP error! status: ${response.status}`
                    //             );
                    //         }
                    //         return response.json();
                    //     })
                    //     .then((data) => {
                    //         // console.log("Success:", data);

                    //         mailerliteForm.style.display = "none";

                    //         if (newsletterSuccess) {
                    //             newsletterSuccess.style.display = "block";
                    //         }
                    //     })
                    //     .catch((error) => {
                    //         if (newsletterError) {
                    //             newsletterError.style.display = "block";
                    //         }
                    //         console.error("Error:", error);
                    //     });
                }
            });
        }

        function getHubspotUTK() {
            const match = document.cookie.match(/hubspotutk=([a-zA-Z0-9-]+)/);
            return match ? match[1] : null;
        }

        async function getClientIP() {
            try {
                const response = await fetch(
                    "https://api64.ipify.org?format=json"
                );
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error("Error fetching IP:", error);
                return null;
            }
        }

        async function submitHubspotForm(emailInputValue) {
            // Get HubSpot tracking data
            const hutk = getHubspotUTK();
            const ipAddress = await getClientIP();

            // Create `hs_context` object
            const hsContext = {
                hutk,
                ipAddress,
                pageUrl: window.location.href,
                pageName: document.title,
            };

            // Convert data into URL-encoded format
            const formData = new URLSearchParams();
            formData.append("email", emailInputValue);
            formData.append("hs_context", JSON.stringify(hsContext)); // Send as JSON string

            // Submit the form
            fetch(
                "https://forms.hubspot.com/uploads/form/v2/144752004/b9ca2fe2-181c-42cd-8ccd-fa9d832334ae",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: formData.toString(),
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.text();
                })
                .then((data) => {
                    console.log("Form submitted successfully:", data);
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                });
        }
    }
}
