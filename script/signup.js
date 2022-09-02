function signUp() {
  var email = $("#emailUsername-signup-input").val();
  var pass = $("#password-signup-input").val();
  var fullName = $("#fullName-signup-input").val();
  var username = $("#username-signup-input").val();
  users.push([email, fullName, username, pass]);
}

// checking signup input
function checkingSignUpInput() {
  var email = $("#emailUsername-signup-input").val();
  var pass = $("#password-signup-input").val();
  var fullName = $("#fullName-signup-input").val();
  var username = $("#username-signup-input").val();
  if (email == "" || pass == "" || fullName == "" || username == "") {
    return false;
  }
  // checking if email have @ and .
  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    return false;
  }
  // checking password length more than 8 characters
  if (pass.length < 8) {
    return false;
  }
  // checking password have number, upper case and lower case letter, special character, and no space
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(pass)) {
    return false;
  }
  // checking if email and username is already taken
  for (let i = 0; i < users.length; i++) {
    if (users[i][0] == email || users[i][2] == username) {
      return "email_username_taken";
    }
  }
  return true;
}

//checking changes on signup input
$(".signUpInput").on("change", () => {
  if (checkingSignUpInput() == true) {
    $("#signup-button").removeAttr("disabled").css("background-color", "#0095f6");
  } else if (checkingSignUpInput() == "email_username_taken") {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
    $("#alert-signup").text("Email or username already taken. Please try again.");
  } else {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
  }
});
