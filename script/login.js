window.onload = () => {
  // carrousel function
  var galleryImage = $(".slideshow");
  var images = ["https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png", "https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png", "https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png", "https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"];
  galleryImage.attr("src", images[0]);
  var i = 0;
  setInterval(() => {
    i = (i + 1) % images.length;
    galleryImage.fadeOut(750, function () {
      $(this).attr("src", images[i]);
      $(this).fadeIn(750);
    });
  }, 5000);
};

function togglePasswordVisibility() {
  var x = document.getElementById("password-login-input");
  if (x.type === "password") {
    x.type = "text";
    $(".toggle_password").text("Hide");
  } else {
    x.type = "password";
    $(".toggle_password").text("Show");
  }
}

function signIn() {
  var users = getUsersData();
  $("#loginButton").attr("disabled", true).css("background-color", "#b2dffc").text("Signing In");
  users.then((data) => {
    $("#loginButton").attr("disabled", false).css("background-color", "#0095f6").text("Sign In");
    var email = $("#emailUsername-login-input").val();
    var pass = $("#password-login-input").val();
    // find user
    var user = data.find((user) => user.email === email || user.username === email);
    if (user) {
      if (user.password == md5(pass)) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("password", user.password);
        window.location.href = "index.html";
      } else {
        $("#alert-login").text("Sorry, your password was incorrect. Please double-check your password.");
      }
    } else {
      $("#alert-login").text("The username you entered doesn't belong to an account. Please check your username and try again.");
    }
  });
}

function checkingLogInInput() {
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
