//window on load
$(window).on("load", () => {
  // var user = Data();
  // user.then((data) => {
  //   //set in local storage
  //   localStorage.setItem("users", JSON.stringify(data));
  // });
});

function signUp() {
  localStorage.removeItem("users");
  var email = $("#email_signup_input").val();
  var pass = $("#password_signup_input").val();
  var fullName = $("#fullname_signup_input").val();
  var username = $("#username_signup_input").val();
  console.log(pass);

  var user = {
    email: email,
    password: pass,
  };

  var userProfile = {
    profile_pic: "https://cdn.discordapp.com/attachments/716472193046806629/1018022736595005481/unknown.png",  
    full_name: fullName,
    username: username,
  };
  // var status = uploadNewUserData(user);
  $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc").text("Signing up...");
  database.auth
    .signUp(user)
    .then((response) => {
      // adding id to userprofile object
      userProfile.id = response?.user?.id;
      response.error ? console.log(response.error) : setToken(response);
      $("#signup-button").attr("disabled", true).css("background-color", "#0095f6").text("Success!");
      database.from("profiles").upsert(userProfile, {returning: "minimal"}).then((response) => {
        console.log(response);
      });
      
      // setTimeout(() => {
      //   window.location.href = "login.html";
      // }, 2000);
    })
    .catch((err) => {
      $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc").text("Something Went Wrong");
      // setTimeout(() => {
      //   window.location.href = "signup.html";
      // }, 2000);
    });
  // status.then((data) => {
  //   console.dir(data);
  //   if (data) {
  //     $("#signup-button").attr("disabled", true).css("background-color", "#0095f6").text("Success!");
  //     setTimeout(() => {
  //       window.location.href = "login.html";
  //     }, 2000);
  //   } else {
  //     $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc").text("Something Went Wrong");
  //     setTimeout(() => {
  //       window.location.href = "signup.html";
  //     }, 2000);
  //   }
  // });
}

function setToken(response) {
  localStorage.setItem("access_token", response.session.access_token);
  localStorage.setItem("refresh_token", response.session.refresh_token);
}

function generateUsername() {
  var email = $("#email_signup_input").val();
  // var users = JSON.parse(localStorage.getItem("users"));
  // generate random username base on email input with random number or special character _
  var username = email.split("@")[0];
  var random = Math.floor(Math.random() * 1000);
  var username = username + "_" + random;
  // checking if there are current user with same username in database or not
  // var isExist = users.filter((user) => user.username === username);
  // isExist.length > 0 ? generateUsername() : $("#username_signup_input").val(username);
  checkingSignUpInput();
}

function checkingEmailValidation() {
  var email = $("#email_signup_input").val();
  // checking input email have @ and .
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");

  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length || email.length < 5 || email === "") {
    return "validation";
  }

  // checking if email already exist in database
  // var users = JSON.parse(localStorage.getItem("users"));
  // var isExist = users.filter((user) => user.email === email);
  // if (isExist.length > 0) {
  //   return "taken";
  // }
  return true;
}

// checking signup input
function checkingSignUpInput() {
  var users = JSON.parse(localStorage.getItem("users"));
  var email = $("#email_signup_input").val();
  var pass = $("#password_signup_input").val();
  var fullName = $("#fullname_signup_input").val();
  var username = $("#username_signup_input").val();

  // checking email input and input it to username
  email.length > 0 ? $("#signUpUsernameElement").removeClass("d-none").addClass("d-block") : $("#signUpUsernameElement").removeClass("d-block").addClass("d-none");

  // checking email from function checkingEmailValidation()
  if (checkingEmailValidation() != true) {
    $("#email_element_signup").removeClass("opacity-0 fa-circle-check text-secondary").addClass("text-danger opacity-1 fa-circle-xmark");
    // return "email_taken";
  } else {
    $("#email_element_signup").removeClass("fa-circle-xmark text-danger opacity-0").addClass("opacity-1 text-secondary fa-circle-check");
  }

  // checking username is exist or no, if exist change class from opacity-0 to opacity-1 in element with id username_element_signup
  // var isUsernameExist = users.filter((user) => user.username === username);
  // if (isUsernameExist.length > 0 || username === "" || username.length < 5) {
  //   $("#username_element_signup").removeClass("opacity-0 fa-circle-check text-secondary").addClass("text-danger opacity-1 fa-circle-xmark");
  //   // return "username_taken";
  // } else {
  //   $("#username_element_signup").removeClass("fa-circle-xmark text-danger opacity-0").addClass("opacity-1 text-secondary fa-circle-check");
  // }

  // checking full name input
  if (fullName.length < 5 || fullName === "") {
    $("#fuullName_element_signup").removeClass("opacity-0 fa-circle-check text-secondary").addClass("text-danger opacity-1 fa-circle-xmark");
  } else {
    $("#fuullName_element_signup").removeClass("fa-circle-xmark text-danger opacity-0").addClass("opacity-1 text-secondary fa-circle-check");
  }

  // Mulai ngecek secara statik disini, diatas adalah live harus langsung tampil

  // checking empty input
  if (email == "" || pass == "" || fullName == "" || username == "") {
    return false;
  }

  // checking full name
  if (fullName.length < 5) {
    return false;
  }

  if (checkingEmailValidation() == "validation") {
    $("#alert-signup").text("Invalid email");
    return false;
  }

  if (checkingEmailValidation() == "taken") {
    return "email_taken";
  }

  // if (isUsernameExist.length > 0) {
  //   return "username_taken";
  // }

  // checking password length more than 8 characters
  if (pass.length < 8) {
    $("#alert-signup").text("Password must be more than 8 characters");
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
  if (number == false) {
    $("#alert-signup").text("Your password must have atleast 1 number");
    return false;
  } else if (uppercase == false) {
    $("#alert-signup").text("Your password must have atleast 1 uppercase character");
    return false;
  } else if (lowercase == false) {
    $("#alert-signup").text("Your password must have atleast 1 lowercase character");
    return false;
  } else if (special == false) {
    $("#alert-signup").text("Your password must have atleast 2 special character");
    return false;
  }

  $("#alert-signup").text("");
  return true;
}

function togglePasswordVisibility() {
  var x = document.getElementById("password_signup_input");
  if (x.type === "password") {
    x.type = "text";
    $(".toggle_password").text("Hide");
  } else {
    x.type = "password";
    $(".toggle_password").text("Show");
  }
}

//checking changes on signup input
$(".signUpInput").on("change", () => {
  if (checkingSignUpInput() == true) {
    $("#alert-signup").text("");
    $("#signup-button").removeAttr("disabled").css("background-color", "#0095f6");
  } else if (checkingSignUpInput() == "email_taken") {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
    $("#email_element_signup").addClass("opacity-1").removeClass("opacity-0");
    $("#alert-signup").text("Another account is using the same email.");
  } else if (checkingSignUpInput() == "username_taken") {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
    $("#alert-signup").text("Username already taken. Please try again.");
  } else {
    $("#signup-button").attr("disabled", true).css("background-color", "#b2dffc");
  }
});
