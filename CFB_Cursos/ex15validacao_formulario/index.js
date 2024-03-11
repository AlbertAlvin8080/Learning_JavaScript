"use strict";

const btn_validate = document.querySelector("#validate");
const input_name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

console.log(password.validity);

btn_validate.addEventListener("click", (event) => {
	event.preventDefault();

	validateForm();
});

function validateForm() {
	// const name_value = input_name.value.trim();
	const email_value = email.value.trim();
	const password_validity = password.validity;
	// const password2_validity = password2.validity;

	if (input_name.validity.valueMissing) {
		// just to remember its existance
		reportError(input_name, "This field is required");
	} else {
		reportSuccess(input_name);
	}

	if (!testEmail(email_value)) {
		reportError(email, "Please insert a valid e-mail");
	} else {
		reportSuccess(email);
	}

	if (password_validity.valueMissing) {
		reportError(password, "This field is required");
	} else if (password_validity.tooShort) {
		reportError(password, "This password is too short");
	} else if (password_validity.tooLong) {
		reportError(password, "This password is too long");
	} else {
		reportSuccess(password);
	}

    if(!password.checkValidity()) {
        reportError(password2, "");
    } else if(password.value.trim() !== password2.value.trim()) {
        reportError(password2, "Please repeat the password correctly")
    } else {
        reportSuccess(password2);
    }
}

function testEmail(email_value) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email_value).toLocaleLowerCase());
}

function reportError(element, message) {
	element.classList.remove("success");
	element.classList.add("error");
	const error_message = element.parentElement.querySelector(".error-message");
	error_message.innerText = message;
}

function reportSuccess(element) {
	element.classList.remove("error");
	element.classList.add("success");
	const error_message = element.parentElement.querySelector(".error-message");
	error_message.innerText = "";
}
