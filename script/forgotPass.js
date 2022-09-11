// input id emailUsername_forgot_input

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

// checking on click forgot_pass_btn
$("#forgot_pass_btn").click(() => {
  let userInput = $("#emailUsername_forgot_input").val();
  let users = getUsersData();
  if ($("#forgot_pass_btn").text() == "Change Password") {
    users.then((data) => {
      var userEmail = getTempVar();
      userInput = md5(userInput);
      var update = updateUserPassword(userEmail, userInput);
      $("#forgot_pass_btn").text("Changing Password").attr("disabled", true).css("background-color", "#b2dffc");
      update.then((data) => {
        if (data == "success") {
          // remove local storage temp
          localStorage.removeItem("temp");
          $("#forgot_pass_btn").text("Password Changed").attr("disabled", true).css("background-color", "#b2dffc");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);
        } else {
          notif("Failed to change password");
          $("#forgot_pass_btn").text("Change Password").attr("disabled", false).css("background-color", "#007bff");
        }
      });
    });
  } else {
    $("#forgot_pass_btn").attr("disabled", true).css("background-color", "#b2dffc").html("Sending");
    users.then((data) => {
      $("#forgot_pass_btn").attr("disabled", false).css("background-color", "#0095f6").html("Send Login Link");
      let user = data.find((user) => user.email === userInput || user.username === userInput);
      if (user) {
        setTempVar(user.email);
        $("#emailUsername_forgot_input").val("").attr("placeholder", "Your new password");
        $("#forgot_pass_btn").text("Change Password").attr("disabled", true).css("background-color", "#b2dffc");
        updateUserProfile(user.email);
      } else {
        notif("User not found");
      }
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
  if ($("#forgot_pass_btn").text() == "Change Password") {
    if (checkingNewPassword(userInput)) {
      $("#forgot_pass_btn").attr("disabled", false).css("background-color", "#0095f6");
    } else {
      $("#forgot_pass_btn").attr("disabled", true).css("background-color", "#b2dffc");
    }
  } else {
    // checking length of input
    if (userInput.length > 6) {
      $("#forgot_pass_btn").attr("disabled", false).css("background-color", "#0095f6");
    } else {
      $("#forgot_pass_btn").attr("disabled", true).css("background-color", "#b2dffc");
    }
  }
});
