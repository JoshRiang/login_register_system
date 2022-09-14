function setTempVar(isi) {
  // local storage
  localStorage.setItem("temp", isi);
}

function getTempVar() {
  // local storage
  return localStorage.getItem("temp");
}

function notif(text) {
  $("#notif_container").removeClass("d-none").html(text);
  // set timeout 3 seconds to hide the notif
  setTimeout(() => {
    $("#notif_container").addClass("d-none");
  }, 5000);
}

const isEmail = (email) => {
  // checking userInput is a email or not
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

window.onload = () => {
  const user = database.auth.user();
  if (get("type") == "recovery" && user) {
    // change the button to change password
    $("#forgot_pass_btn").text("Change Password");
    $("#label_emailUsername_forgot_input").text("New Password");
  }
};

$("#forgot_pass_btn").click(() => {
  const user = database.auth.user();
  let userInput = $("#emailUsername_forgot_input").val();
  if (get("type") == "recovery" && user) {
    if (!checkingNewPassword(userInput)) return notif("Check again your password input")

    updateUserPassword(userInput).then((res) => {
      $("#forgot_pass_btn").text("Changing Password").attr("disabled", true);
      if (res) notif("Something went wrong, please try again later");
      else {
        $("#forgot_pass_btn").text("Success...").attr("disabled", true);
        notif("Password changed successfully");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    });
  } else {
    if (!isEmail(userInput)) return notif("Please input a valid email");
    $("#forgot_pass_btn").html("Checking...").attr("disabled", true);
    resetUserPassword(userInput).then((res) => {
      $("#forgot_pass_btn").html("Send Login Link").attr("disabled", false);
      if (res.error) {
        return notif("Please dont spam, try again after a while.");
      }
      return notif("Done, check your email.");
    });
  }
});

function checkingNewPassword(pass) {
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
  return true;
}

$("#emailUsername_forgot_input").on("keyup", () => {
  let userInput = $("#emailUsername_forgot_input").val();
  // checking length of input
  if (userInput.length > 6) {
    $("#forgot_pass_btn").attr("disabled", false).css("background-color", "#0095f6");
  } else {
    $("#forgot_pass_btn").attr("disabled", true).css("background-color", "#b2dffc");
  }
});
