import jqueryValidate from "jquery-validation";

export default function () {
    // Find all forms
    const $forms = $("form");

    // Add custom methods
    $.validator.addMethod("letters", function (value, element) {
        return (
            $.validator.methods.required.call(this, value, element) ||
            /^[\p{L}\s]*$/u.test(value)
        );
    });
    $.validator.addMethod("phone", function (value, element) {
        return (
            $.validator.methods.required.call(this, value, element) ||
            /^[\d\s().+-]+$/.test(value)
        );
    });

    $forms.each(function () {
        $(".form_input-error").hide();
        $(".form_privacy-error").hide();

        const $form = $(this);

        $form.validate({
            rules: {
                Name: {
                    required: true,
                    minlength: 3,
                    letters: true,
                },
                Company: {
                    required: true,
                    minlength: 3,
                    letters: true,
                },
                Email: {
                    required: true,
                    email: true,
                },
                Phone: {
                    required: true,
                    phone: true,
                },
                "Privacy-Policy": {
                    required: true,
                },
            },

            errorPlacement: function (error, element) {
                // Handle input errors
                if (
                    element.attr("name") === "Name" ||
                    element.attr("name") === "Email" ||
                    element.attr("name") === "Phone" ||
                    element.attr("name") === "Company"
                ) {
                    const $inputWrapper = element
                        .closest(".form_field-wrapper")
                        .find(".form_input-error");
                    $inputWrapper.show();
                } else if (element.attr("name") === "Privacy-Policy") {
                    const $privacyWrapper = element
                        .closest(".form_checkbox")
                        .find(".form_privacy-error");

                    $privacyWrapper.show();
                } else {
                    error.insertAfter(element); // Default placement
                }
            },
            success: function (label, element) {
                // Hide input errors on success

                if (
                    element.name === "Name" ||
                    element.name === "Email" ||
                    element.name === "Phone" ||
                    element.name === "Company"
                ) {
                    const $inputWrapper = $(element)
                        .closest(".form_field-wrapper")
                        .find(".form_input-error");
                    $inputWrapper.hide();
                } else if (element.name === "Privacy-Policy") {
                    const $privacyWrapper = $(element)
                        .closest(".form_checkbox")
                        .find(".form_privacy-error");

                    $privacyWrapper.hide();
                }
            },
        });
    });
}
