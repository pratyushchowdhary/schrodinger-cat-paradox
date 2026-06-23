const screens = Array.from(document.querySelectorAll(".screen"));
const indicators = Array.from(document.querySelectorAll("[data-step-indicator]"));
const toast = document.querySelector("#toast");
const businessName = document.querySelector("#businessName");
const submitButton = document.querySelector("#submitApplication");
const confirmDetails = document.querySelector("#confirmDetails");
let currentScreen = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function goToScreen(index) {
  currentScreen = Math.max(0, Math.min(index, screens.length - 1));
  screens.forEach((screen, screenIndex) => {
    screen.classList.toggle("active", screenIndex === currentScreen);
  });
  indicators.forEach((indicator, indicatorIndex) => {
    indicator.classList.toggle("active", indicatorIndex <= Math.min(currentScreen, indicators.length - 1));
  });
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentScreen === 1 && !businessName.value.trim()) {
      showToast("Add your legal business name to continue");
      return;
    }
    if (currentScreen === 2) {
      showToast("AI is reading uploaded documents");
    }
    goToScreen(currentScreen + 1);
  });
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", () => goToScreen(currentScreen - 1));
});

document.querySelector("[data-reset]").addEventListener("click", () => {
  confirmDetails.checked = false;
  submitButton.disabled = true;
  goToScreen(0);
});

document.querySelector("#uploadZone").addEventListener("click", () => {
  showToast("Sample files attached for prototype");
  document.querySelectorAll(".doc-card").forEach((card, index) => {
    if (index < 2) card.classList.add("selected");
  });
});

confirmDetails.addEventListener("change", () => {
  submitButton.disabled = !confirmDetails.checked;
});

submitButton.addEventListener("click", () => {
  if (!confirmDetails.checked) {
    showToast("Review and confirm details before submitting");
    return;
  }
  goToScreen(4);
});

submitButton.disabled = true;
goToScreen(0);
