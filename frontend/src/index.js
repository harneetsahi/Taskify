async function signUp(e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  const response = await axios.post("http://localhost:3000/signup", {
    username,
    password,
  });

  alert("you are signed up");
}

async function login(e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await axios.post("http://localhost:3000/login", {
    username,
    password,
  });

  localStorage.setItem("token", response.data.token);

  alert("Successfully logged in");
}

async function getUserInfo() {
  const response = await axios.get("http://localhost:3000/me", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  document.getElementById(
    "userInfo"
  ).innerHTML = `Welcome! Here are you crendentials: Username: ${response.data.username}`;
}

function logout() {
  localStorage.removeItem("token");
}

getUserInfo();
