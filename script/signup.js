function signUp() {
  var email = $("#email-signup-input").val();
  var pass = $("#password-signup-input").val();
  var fullName = $("#fullname-signup-input").val();
  var username = $("#username-signup-input").val();
  var user = [email, fullName, username, pass];
  console.log("Berhasil memasukan data, datanya: ");
  console.log(user);
  setData(user);
  console.log(getData());
}

// checking signup input
function checkingSignUpInput() {
  var users = getData();
  var email = $("#email-signup-input").val();
  var pass = $("#password-signup-input").val();
  var fullName = $("#fullName-signup-input").val();
  var username = $("#username-signup-input").val();
  if (email == "" || pass == "" || fullName == "" || username == "") {
    return false;
  }
  // checking input email have @ and .
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    return false;
  }
  // checking password length more than 8 characters
  if (pass.length < 8) {
    return false;
  }
  // checking password atleast have 1 number, 1 uppercase, 1 lowercase, and 1 special character
  var number = false;
  var uppercase = false;
  var lowercase = false;
  var special = false;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] >= "0" && pass[i] <= "9") {
      number = true;
    }
    if (pass[i] >= "A" && pass[i] <= "Z") {
      uppercase = true;
    }
    if (pass[i] >= "a" && pass[i] <= "z") {
      lowercase = true;
    }
    if (
      pass[i] == "!" ||
      pass[i] == "@" ||
      pass[i] == "#" ||
      pass[i] == "$" ||
      pass[i] == "%" ||
      pass[i] == "^" ||
      pass[i] == "&" ||
      pass[i] == "*" ||
      pass[i] == "(" ||
      pass[i] == ")" ||
      pass[i] == "-" ||
      pass[i] == "_" ||
      pass[i] == "+" ||
      pass[i] == "=" ||
      pass[i] == "{" ||
      pass[i] == "}" ||
      pass[i] == "[" ||
      pass[i] == "]" ||
      pass[i] == ":" ||
      pass[i] == ";" ||
      pass[i] == "'" ||
      pass[i] == '"' ||
      pass[i] == "<" ||
      pass[i] == ">" ||
      pass[i] == "?" ||
      pass[i] == "/" ||
      pass[i] == "`" ||
      pass[i] == "~" ||
      pass[i] == ","
    ) {
      special = true;
    }
  }
  if (number == false || uppercase == false || lowercase == false || special == false) {
    return false;
  }
  // checking if email and username is already taken
  for (let i = 0; i < users.length; i++) {
    if (users[i][0] == email) {
      return "email_taken";
    } else if (users[i][2] == username) {
      return "username_taken";
    }
  }
  return true;
}

//checking changes on signup input
$(".signUpInput").on("change", () => {
  if (checkingSignUpInput() == true) {
    $("#signup-button").removeAttr("disabled").css("background-color", "#0095f6");
  } else if (checkingSignUpInput() == "email_taken") {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
    $("#alert-signup").text("Email already taken. Please try again.");
  } else if (checkingSignUpInput() == "username_taken") {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
    $("#alert-signup").text("Username already taken. Please try again.");
  } else {
    $("#alert-signup").text("");
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
  }
});
