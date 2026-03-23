async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  console.log("登录返回：", data); // 👈 看这里

  if (!data.token) {
    alert("登录失败");
    return;
  }

  token = data.token;

  alert("登录成功"); // 👈 你应该看到这个

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";

  loadNotes();
}
  });
}
