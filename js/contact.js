document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("contactBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const contactModal = document.getElementById("contactModal");

  openModalBtn.addEventListener("click", function () {
    contactModal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    contactModal.style.display = "none";
  });
});
