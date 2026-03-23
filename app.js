const API = "https://suyu-web.onrender.com"; // 可用可不用

const input = document.getElementById("input");
const preview = document.getElementById("preview");

/* 实时预览 */
input.addEventListener("input", () => {
  preview.innerHTML = marked.parse(input.value);
});

/* 插入图片 */
async function uploadImage() {
  const file = document.getElementById("image").files[0];
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(API + "/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  input.value += `\n![image](${data.url})\n`;
  preview.innerHTML = marked.parse(input.value);
}

/* 左侧切换 */
function switchTab(tab) {
  alert("切换到：" + tab);
}
