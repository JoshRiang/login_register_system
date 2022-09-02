var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("sliderimage");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2500);
}

function signIn() {
  var email = $("#emailUsername-login-input").val();
  var pass = $("#password-login-input").val();
  for (let i = 0; i < users.length; i++) {
    if (users[i][0] == email || users[i][2] == email) {
      console.log("User found");
      if (users[i][3] == pass) {
        console.log("Login Successful");
        $("#alert-login").text("");
      } else {
        $("#alert-login").text("Sorry, your password was incorrect. Please double-check your password.");
      }
    } else {
      $("#alert-login").text("The username you entered doesn't belong to an account. Please check your username and try again.");
    }
  }
}

function checkingLogInInput() {
  // checking input email have @ and .
  var email = $("#emailUsername-login-input").val();
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    return false;
  }
  // checking input password have at least 8 characters
  var pass = $("#password-login-input").val();
  if (pass.length < 8) {
    return false;
  }
  return true;
}

$(".loginInput").on("keyup", () => {
  if (checkingLogInInput()) {
    $("#loginButton").attr("disabled", false).css("background-color", "#0095f6");
  } else {
    $("#loginButton").attr("disabled", true).css("background-color", "#b2dffc");
  }
});
