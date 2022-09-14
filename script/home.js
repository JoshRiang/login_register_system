// check if session login or not
// window on load
$(window).on("load", () => {
  setTimeout(() => {
    var user = database.auth.user();
    if (!user) {
      window.location.href = "login.html";
    }
    var user = getUserData(localStorage.getItem("user_id"), "", ""); // get all users data
    user.then((data) => {
      // store my current data to session storage
      sessionStorage.setItem("name", data.username);
      sessionStorage.setItem("full_name", data.full_name);
      sessionStorage.setItem("profile_pic", data.profile_pic);
      sessionStorage.setItem("email", data.email);
      loadPage();
    });
  }, 800);
});

// load page
function loadPage() {
  $(".user_username").text(sessionStorage.getItem("name"));
  $(".user_fullname").text(sessionStorage.getItem("full_name"));

  $("#postUsername").html("<img class='me-3 user_profile_pic img-fluid m-0 p-0 rounded-circle ratio ratio-1x1' style='width: 40px' alt='prof_pic' />" + sessionStorage.getItem("full_name"));
  $(".user_profile_pic").attr("src", sessionStorage.getItem("profile_pic")); // set user profile pic
}

function modalEditProfile() {
  $("#modal_edit_profile").removeClass("d-none").addClass("d-block");
  // take data from session storage and set to modal input
  setTimeout(() => {
    $("#username_edit_profile").val(sessionStorage.getItem("name"));
    $("#full_name_edit_profile").val(sessionStorage.getItem("full_name"));
    $("#image_edit_profile_img").attr("src", sessionStorage.getItem("profile_pic"));
    $("#image_edit_profile").val(sessionStorage.getItem("profile_pic"));
  }, 100);
}

function closeModalProfile() {
  $("#modal_edit_profile").removeClass("d-block").addClass("d-none");
}

function editProfile() {
  var user = getUsersData(); // get all users data
  // make the button disabled and text updating
  $("#btn_edit_profile").attr("disabled", true).text("Updating...");
  var username = $("#username_edit_profile").val();
  var full_name = $("#full_name_edit_profile").val();
  var profile_pic = $("#image_edit_profile").val();
  // checking if there is any empty input
  if (username == "" || full_name == "") {
    $("#alert_edit_profile_modal").text("Please fill all the input");
    $("#btn_edit_profile").attr("disabled", false).text("Update");
    return;
  }
  // checking empty profile pic
  if (!profile_pic) {
    console.log("profile pic is empty");
    profile_pic = "https://cdn.discordapp.com/attachments/716472193046806629/1018022736595005481/unknown.png";
  }
  // checking profile pic link end with .png or .jpg
  if (!profile_pic.endsWith(".png") && !profile_pic.endsWith(".jpg") && !profile_pic.endsWith(".jpeg")) {
    console.log("profile pic is not end with .png or .jpg");
    profile_pic = "https://cdn.discordapp.com/attachments/716472193046806629/1018022736595005481/unknown.png";
  }
  // checking if username is already taken
  user.then((data) => {
    var user = data.find((user) => user.username === username); // find user data from users data
    if (user && user.email != sessionStorage.getItem("email")) {
      console.log("username is already taken");
      $("#alert_edit_profile_modal").text("Username is already taken");
      $("#btn_edit_profile").attr("disabled", false).text("Update");
      return;
    }
    $("#btn_edit_profile").attr("disabled", false);
    // update user data
    var dataUpdate = {
      username: username,
      full_name: full_name,
      profile_pic: profile_pic,
    };
    var update = updateUserProfile(localStorage.getItem("user_id"), dataUpdate);
    update.then((data2) => {
      // update session storage
      sessionStorage.setItem("name", username);
      sessionStorage.setItem("full_name", full_name);
      sessionStorage.setItem("profile_pic", profile_pic);
      // update profile pic
      $("#user_profile_pic").attr("src", profile_pic);
      // close modal
      closeModalProfile();
      // make the button enabled and text update
      $("#btn_edit_profile").attr("disabled", false).text("Update");
      //reload the page
      $("#alert_edit_profile_modal").text("");
      $("btn_edit_profile").text("Update");
      loadPage();
    });
  });
}

function logOut() {
  // clear session storage
  sessionStorage.clear();
  // clear local storage
  localStorage.clear();
  database.auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
