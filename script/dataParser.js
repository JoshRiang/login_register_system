const database = supabase.createClient("https://yyndohsyyiveciumdjrj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bmRvaHN5eWl2ZWNpdW1kanJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIzNTk3MzksImV4cCI6MTk3NzkzNTczOX0.OcV8ko_ruHhEu3qyboas2zXllbcQMLdkjXCNZNwh3CM");

const getUsersData = async () => {
  const res = await database.from("profiles").select("*");
  if (res) {
    return res.data;
  }
};

const getUserData = async (id, email, username) => {
  if (id) {
    const res = await database.from("profiles").select("*").eq("id", id).single();
    if (res) {
      return res.data;
    }
  } else if (email) {
    const res = await database.from("profiles").select("*").eq("email", email);
    if (res) {
      return res.data;
    }
  } else if (username) {
    const res = await database.from("profiles").select("*").eq("username", username);
    if (res) {
      return res.data;
    }
  }
  return false;
};

const resetUserPassword = async (email) => {
  const data = await database.auth.api.resetPasswordForEmail(email, {redirectTo:"https://joshriang.github.io/login_register_system/"});
  return data;
};

const updateUserPassword = async (pass) => {
  const { user, error } = await database.auth.update({
    password: pass,
  });
  if (user) {
    const { error } = await database.auth.signOut();
    if (error) return error;
  } else {
    return error;
  }
};

const uploadNewUserData = async (data) => {
  const res = await database.from("users").insert(data);
  if (res) {
    return res.data;
  }
};

const updateUserProfile = async (iden, data) => {
  const res = await database.from("profiles").update(data).eq("id", iden);
  if (res) {
    return res.data;
  }
};

const get = (param) => {
  var $_GET = {};
  if (document.location.toString().indexOf("?") !== -1) {
    var query = document.location
      .toString()
      // get the query string
      .replace(/^.*?\?/, "")
      // and remove any existing hash string (thanks, @vrijdenker)
      .replace(/#.*$/, "")
      .split("&");

    for (var i = 0, l = query.length; i < l; i++) {
      var aux = decodeURIComponent(query[i]).split("=");
      $_GET[aux[0]] = aux[1];
    }
  }
  //get the 'index' query parameter
  return $_GET[param];
};

const getUrlFragment = (param) => {
  let urlFragment = new URLSearchParams(window.location.hash.substring(1));
  return urlFragment.get(param);
};

database.auth.onAuthStateChange((event, session) => {
  if (getUrlFragment("type") == "recovery") {
    window.location.href = "forgotpass.html?type=recovery";
  }
});
