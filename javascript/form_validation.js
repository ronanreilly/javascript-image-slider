// Ronan Reilly 2013

// This function is used to t=check regular expressions passed to it from other functions.
// it takes four parameters, a reg ex, an input value, some help text and a help message. 

function validateRegEx(regex, input, helpText, helpMessage) {
    // Checking to see if the inputs value checks out.	
    if (!regex.test(input)) {
        // If the data does not check out then set teh help message.
        if (helpText != null) helpText.innerHTML = helpMessage;
        return false;
    } else {
        // Clear the help message if checks out.
        if (helpText != null) helpText.innerHTML = "";
        return true;
    }
}

// This function checks that an inputs value is not empty.
// Its sets the help message if it is empty.

function notEmpty(inputField, helpText) {
    // See if the input value contains any text
    return validateRegEx(/.+/, inputField.value, helpText, "This field is required!");
}

// This function takes four parameters. A value for min length, max length, an input value and
// a help message.

function valNoChars(minLength, maxLength, inputField, helpText) {
    // Checking that input contains the minimum at least and no more than the maximum.
    return validateRegEx(new RegExp("^.{" + minLength + "," + maxLength + "}$"), inputField.value, helpText, "Must be be between " + minLength + " to " + maxLength + " characters.");
}

// This function is used to check the email input from the for using regular expression.

function valEmailFormat(inputField, helpText) {
    // First see if the input value contains data
    if (!notEmpty(inputField, helpText)) return false;
    // Then see if the input value is an email address
    return validateRegEx(/^[\w\.-_\+]+@[\w-]+(\.\w{2,3})+$/, inputField.value, helpText, "Please enter a valid email address!");
}

// This function is used to check the forms phone number field. It sets a ragular expression for the format
// of the phone number before asking the validateRegEx to check teh expression.

function valPhoneNum(inputField, helpText) {
    // First see if the input value contains data
    if (!notEmpty(inputField, helpText)) return false;
    // Then see if the input value is a phone number
    return validateRegEx(/^\d{3}-\d{2}-\d{5}$/, inputField.value, helpText, "Not a valid phone Number! (for example, 041-98-32796).");
}

// This function is called when the submit button on the form is submitted. It checks that all of the validation rules have been apllied and
// check out. There is a small bug here concerning the check on the radio buttons, this is an error with the syntax of how this 
// check is performed. It does not affect the overall submition of teh form and partly works. 

function beginThisValidation(form) {
    if (valNoChars(1, 50, form["name"], form["name_error"]) && valEmailFormat(form["email"], form["email_error"]) && valPhoneNum(form["phone"], form["phone_error"])){
	
        if (document.getElementById("Yes").checked == false && document.getElementById("No").checked == false) {
            document.getElementById('news_error').innerHTML = "Please select Yes or No!";
        }
        form.submit();
    } else {
        alert("Please fill in all the required fields with the correct data.");
    }
}