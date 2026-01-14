// function jump to table

const jump_btn = document.querySelector(".jump_btn");

function jump() {
  if (window.location.pathname.includes("/table.html")) {
    window.location.pathname = "./index.html";
    return
  }
  window.location.pathname = "./table.html";
}

jump_btn.addEventListener("click", jump);