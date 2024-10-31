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

        emailInput.addEventListener("input", function () {
            emailRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });

        privacyCheckbox.addEventListener("change", function () {
            privacyRequired.style.display = "none";
            newsletterSuccess.style.display = "none";
            newsletterError.style.display = "none";
        });
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
                fetch("https://connect.mailerlite.com/api/subscribers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjhhODg3NjMwNzhhOTIxNDg2YTA4NzFjOTA4ZGU3ZWIyNWEyMjA1MGQ0YWM1YjNiNjBjM2RkNzkxOTUwMWVkNjk5MDQ3MTcwOGExY2Y5NDIiLCJpYXQiOjE3MjY2NTg2OTAuNjgxMjkzLCJuYmYiOjE3MjY2NTg2OTAuNjgxMjk3LCJleHAiOjQ4ODIzMzIyOTAuNjc3MzY4LCJzdWIiOiIxMTA4NTUyIiwic2NvcGVzIjpbXX0.ueZVWOw66s2AN4cmmD5mZMdKcvZ4jbB2tJcNxKtNywwVFTnevBkQuy8S42lmozxotpecYQ5IwzDqJMf66AchJSpAW7mxlO86Ck0BhwdS7Lfaeuvp5mlkt6s2oHTKErPjGHewStUcMdizRMn432OTuwokJ5PexV-c-0xGYAS59q2pwQZC2L9v61JsPO2ROBB0JXXAbUqS56N52Wp5oxHIztUdkyrF8cEaInrxf4o2AvJ6jMzgPdh73fwCGUSFw9lebsfgveFvjeDyOKWj9C6qAXn9PnE-_knKsj_LVWfCy9yntmf_smwQ1LUcuMbrXcuwI-oh15ZEfdrzl2rPJqlBFPUVx3ItzesbwmlhmRgKyeDRvOQ3E6WaXdErTMD-jb8MX2izGs0I36GO71eARhXBXIA5gtGWBKGujqkzKkJbSsvkSrXvoNxhVeGqw9pkoD3VoQ9tHJssws3WC3nyn6tBrHZlQGqEZ9EEoVig8yZF2q6xpgroDMxoX204DD8YkThSHO1ZfkM-wmNL64-XmW-ZZDqrQNoAm3uwJYM1RfMxFfAXp9LWY5_YKt5DiBUO57EGrljkH4BHvQGa6ObfrYptw0Rr2QnUPGNSFRFQsy3qpXrnivkqw5R6TtuACdCRYGgw3N8g-D1hoIrv5Qn2Jy225znQjgmY_XfqozMv_FNMfcE",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // console.log("Success:", data);

                        mailerliteForm.style.display = "none";

                        if (newsletterSuccess) {
                            newsletterSuccess.style.display = "block";
                        }
                    })
                    .catch((error) => {
                        if (newsletterError) {
                            newsletterError.style.display = "block";
                        }
                        console.error("Error:", error);
                    });
            }
        });
    }
}
