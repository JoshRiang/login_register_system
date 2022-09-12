const database = supabase.createClient("https://yyndohsyyiveciumdjrj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bmRvaHN5eWl2ZWNpdW1kanJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIzNTk3MzksImV4cCI6MTk3NzkzNTczOX0.OcV8ko_ruHhEu3qyboas2zXllbcQMLdkjXCNZNwh3CM");




const getUsersData = async () => {
  const res = await database.from("users").select("*");
  if (res) {
    return res.data;
  }
};

const uploadNewUserData = async (data) => {
  const res = await database.from("users").insert(data);
  if (res) {
    return res.data;
  }
};

const updateUserPassword = async (iden, pass) => {
  const res = await database.from("users").update({ password: pass }).eq("email", iden);
  if (res) {
    return "success";
  } else {
    return "failed";
  }
};

const updateUserProfile = async (iden, data) => {
  const res = await database.from("users").update(data).eq("email", iden);
  if (res) {
    return res.data;
  }
};

const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
  if (error) return error.message;
  return data;
};

const uploadNewPost = async (data) => {
  const res = await database.from("posts").insert(data);
  if (res) {
    return res.data;
  }
};

const getAllPost = async () => {
  const res = await database.from("posts").select("*");
  if (res) {
    return res.data;
  }
};
