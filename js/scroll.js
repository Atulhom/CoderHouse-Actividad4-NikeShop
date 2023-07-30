function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrollToBottom() {
  const scrollHeight = document.body.scrollHeight;
  window.scrollTo({
    top: scrollHeight,
    behavior: "smooth",
  });
}

document
  .getElementById("btnScrollToTop")
  .addEventListener("click", scrollToTop);
document
  .getElementById("btnScrollToBottom")
  .addEventListener("click", scrollToBottom);
