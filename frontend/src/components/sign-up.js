document.addEventListener("DOMContentLoaded", function () {
  // // Clear all elements in the body tag
  // document.body.innerHTML = '';
  // Change the title tag value
  document.title = "Sign up | Bank Application ™";

  //  Set a new link element for the CSS stylesheet
  var link = document.getElementById("css");
  link.setAttribute("href", "../src/styles/sign-up.css");

  // Create main element
  const mainElement = document.getElementById("main");

  // Create form element
  const formElement = document.createElement("form");

  const formContainer = document.createElement("div");
  formContainer.className = "form-container slideRight-animation";

  const formHeading = document.createElement("h1");
  formHeading.className = "form-header";
  formHeading.textContent = "Get Started";

  // Create div with class "input-container"
  const inputContainerDivFirst = document.createElement("div");
  inputContainerDivFirst.className = "input-container";

  // Create label element inside div.input-container
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", "f-name");

  // Create and append other form elements as needed
  // For example, creating input elements
  const firstNameInput = document.createElement("input");
  firstNameInput.type = "text";
  firstNameInput.name = "f-name";
  firstNameInput.id = "f-name";
  firstNameInput.required = true;
  firstNameInput.placeholder = "First Name";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error";

  // // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivFirst.appendChild(labelElement);
  inputContainerDivFirst.appendChild(firstNameInput);
  inputContainerDivFirst.appendChild(errorDiv);

  const inputContainerDivLast = document.createElement("div");
  inputContainerDivLast.className = "input-container";

  // Create label element inside div.input-container
  const labelElementlast = document.createElement("label");
  labelElementlast.setAttribute("for", "f-name");

  // Create and append other form elements as needed
  // For example, creating input elements
  const lastNameInput = document.createElement("input");
  lastNameInput.type = "text";
  lastNameInput.name = "l-name";
  lastNameInput.id = "l-name";
  lastNameInput.required = true;
  lastNameInput.placeholder = "Last Name";

  const errorDivlast = document.createElement("div");
  errorDivlast.className = "error";

  // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivLast.appendChild(labelElementlast);
  inputContainerDivLast.appendChild(lastNameInput);
  inputContainerDivLast.appendChild(errorDivlast);

  const inputContainerDivEmail = document.createElement("div");
  inputContainerDivEmail.className = "input-container";

  // Create label element inside div.input-container
  const labelElementEmail = document.createElement("label");
  labelElementEmail.setAttribute("for", "f-name");

  // Create and append other form elements as needed
  // For example, creating input elements
  // Create and append more form elements
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "mail";
  emailInput.id = "mail";
  emailInput.required = true;
  emailInput.placeholder = "E-mail";

  const errorDivEmail = document.createElement("div");
  errorDivEmail.className = "error";

  // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivEmail.appendChild(labelElementEmail);
  inputContainerDivEmail.appendChild(emailInput);
  inputContainerDivEmail.appendChild(errorDivEmail);

  const inputContainerDivPhone = document.createElement("div");
  inputContainerDivPhone.className = "input-container";

  // Create label element inside div.input-container
  const labelElementPhone = document.createElement("label");
  labelElementPhone.setAttribute("for", "f-name");

  const phoneInput = document.createElement("input");
  phoneInput.type = "tel";
  phoneInput.name = "phone";
  phoneInput.id = "phone";
  phoneInput.required = true;
  phoneInput.placeholder = "Phone";

  const errorDivPhone = document.createElement("div");
  errorDivPhone.className = "error";

  // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivPhone.appendChild(labelElementPhone);
  inputContainerDivPhone.appendChild(phoneInput);
  inputContainerDivPhone.appendChild(errorDivPhone);

  const inputContainerDivUserName = document.createElement("div");
  inputContainerDivUserName.className = "input-container";

  // Create label element inside div.input-container
  const labelElementUserName = document.createElement("label");
  labelElementUserName.setAttribute("for", "u-name");

  // Create and append other form elements as needed
  // For example, creating input elements
  // Create and append more form elements
  const userName = document.createElement("input");
  userName.type = "text";
  userName.name = "username";
  userName.id = "username";
  userName.required = true;
  userName.placeholder = "username";

  const errorDivUserName = document.createElement("div");
  errorDivUserName.className = "error";

  // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivUserName.appendChild(labelElementUserName);
  inputContainerDivUserName.appendChild(userName);
  inputContainerDivUserName.appendChild(errorDivUserName);


  const inputContainerDivPswd = document.createElement("div");
  inputContainerDivPswd.className = "input-container";

  // Create label element inside div.input-container
  const labelElementPswd = document.createElement("label");
  labelElementPswd.setAttribute("for", "f-name");

  // Create and append other form elements as needed
  // For example, creating input elements
  // Create and append more form elements
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "user-password";
  passwordInput.id = "user-password";
  passwordInput.className = "user-password";
  passwordInput.required = true;
  passwordInput.placeholder = "Password";

  const errorDivPswd = document.createElement("div");
  errorDivPswd.className = "error";

  // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivPswd.appendChild(labelElementPswd);
  inputContainerDivPswd.appendChild(passwordInput);
  inputContainerDivPswd.appendChild(errorDivPswd);

  const inputContainerDivConfirm = document.createElement("div");
  inputContainerDivConfirm.className = "input-container";

  // Create label element inside div.input-container
  const labelElementConfirm = document.createElement("label");
  labelElementConfirm.setAttribute("for", "f-name");

  // Create and append other form elements as needed
  // For example, creating input elements
  // Create and append more form elements
  const confirmPasswordInput = document.createElement("input");
  confirmPasswordInput.type = "password";
  confirmPasswordInput.name = "user-password-confirm";
  confirmPasswordInput.id = "user-password-confirm";
  confirmPasswordInput.className = "password-confirmation";
  confirmPasswordInput.required = true;
  confirmPasswordInput.placeholder = "Confirm Password";

  const errorDivConfirm = document.createElement("div");
  errorDivConfirm.className = "error";

  // Append label, input, span, and div.error elements to div.input-container
  inputContainerDivConfirm.appendChild(labelElementConfirm);
  inputContainerDivConfirm.appendChild(confirmPasswordInput);
  inputContainerDivConfirm.appendChild(errorDivConfirm);

  // Create div with id "btm"
  const btmDiv = document.createElement("div");
  btmDiv.id = "btm";
  btmDiv.className = "sub-btn";

  // Create button element inside div#btm
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "submit-btn";
  submitButton.textContent = "Create Account";

  // Create a link (a element) inside p.btm-text
  const loginLink = document.createElement("a");
  loginLink.href = "#"; // Set the desired URL for the link
  loginLink.className = "btm-text-highlighted";
  loginLink.textContent = "Log in";

  // Create p element inside div#btm
  const btmText = document.createElement("p");
  btmText.className = "btm-text";
  btmText.innerHTML = "Already have an account..? ";
  btmText.appendChild(loginLink);

  // Append button and p elements to div#btm
  btmDiv.appendChild(submitButton);
  btmDiv.appendChild(btmText);

  // Append input elements to the form
  formContainer.appendChild(formHeading);
  formContainer.appendChild(inputContainerDivFirst);
  formContainer.appendChild(inputContainerDivLast);
  formContainer.appendChild(inputContainerDivEmail);
  formContainer.appendChild(inputContainerDivPhone);
  formContainer.appendChild(inputContainerDivUserName);
  formContainer.appendChild(inputContainerDivPswd);
  formContainer.appendChild(inputContainerDivConfirm);
  formContainer.appendChild(btmDiv);
  formElement.appendChild(formContainer);

  // Add event listener for form submission
  formElement.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Get the password and confirm password input values
    const password = document.getElementById("user-password").value;
    const confirmPassword = document.getElementById(
      "user-password-confirm"
    ).value;

    // Compare the password and confirm password values
    if (password !== confirmPassword) {
      // Passwords do not match, prevent form submission and show error message
      event.preventDefault();

      // Show error message (you can customize the error message as needed)
      errorDivConfirm.textContent =
        "Password and Confirm Password must be the same.";
      // Append the error message to the body or a specific container
    }
    // If passwords match, the form will be submitted as usual
    // Send Request to server to create a new account
    const formData = new FormData(event.target);
    // Convert FormData object to a plain JavaScript object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    // console.log(formDataObject);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });

    const result = await response.json();
    console.log(result);
  });

  // Append div.image-container and form elements to main element
  mainElement.appendChild(formElement);

  // Append main element to the body of index.html
  document.body.appendChild(mainElement);
});
