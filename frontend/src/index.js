async function signUp(e) {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const response = await axios.post("http://localhost:3000/signup", {
    email,
    password,
  });

  alert("you are signed up");
}

async function login(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await axios.post("http://localhost:3000/login", {
    email,
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
  ).innerHTML = `Welcome! ${response.data.name}`;
}

function logout() {
  localStorage.removeItem("token");
}

// getUserInfo();
