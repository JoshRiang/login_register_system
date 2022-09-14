window.onload = () => {
  $("body").css("padding-top", "58px");
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

async function signIn() {
  $("#loginButton").attr("disabled", true).css("background-color", "#b2dffc").text("Signing In");
  var email = $("#emailUsername-login-input").val();
  var password = $("#password-login-input").val();
  var userData = {
    email: email,
    password: password,
  };
  await database.auth.signIn(userData).then((response) => {
    if (response.error) {
      $("#alert-login").text("Invalid credentials. Please check your username or password and try again.");
      $("#loginButton").removeAttr("disabled").css("background-color", "#0095f6").text("Log In");
    } else {
      localStorage.setItem("user_id", response.user.id);
      window.location.href = "index.html";
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
