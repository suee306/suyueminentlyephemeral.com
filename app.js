const API = "https://suyu-web.onrender.com";

const input = document.getElementById("input");
const preview = document.getElementById("preview");
const notesDiv = document.getElementById("notes");

/* 自动加载 */
window.onload = () => {
  input.value = localStorage.getItem("draft") || "";
  renderPreview();
  loadNotes();
};

/* 实时预览 */
input.addEventListener("input", () => {
  localStorage.setItem("draft", input.value);
  renderPreview();
});

function renderPreview() {
  preview.innerHTML = marked.parse(input.value);
}

/* 图片 */
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
  renderPreview();
}

/* 保存笔记 */
function saveNote() {
  const content = input.value;
  const tags = document.getElementById("tags").value;

  let notes = JSON.parse(localStorage.getItem("notes") || "[]");

  notes.unshift({
    content,
    tags,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

/* 渲染卡片 */
function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");

  notesDiv.innerHTML = "";

  notes.forEach(n => {
    notesDiv.innerHTML += `
      <div class="note">
        <div>${marked.parse(n.content)}</div>
        <div>
          ${n.tags.split(" ").map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <small>${n.time}</small>
      </div>
    `;
  });
}

/* 暗黑模式 */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* 左侧切换 */
function switchTab(tab) {
  alert("切换：" + tab);
}
