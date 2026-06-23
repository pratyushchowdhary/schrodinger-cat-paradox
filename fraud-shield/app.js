const riskyTerms = {
  otp: "The caller asked for your OTP",
  pin: "The caller asked for your PIN",
  password: "The caller asked for your password",
  "bank balance": "The caller mentioned your bank balance",
  gift: "The caller promised a gift",
  prize: "The caller promised a prize",
  "account number": "The caller asked for your account number",
  cvv: "The caller asked for your card CVV",
  "verification code": "The caller asked for a verification code",
  "transfer money": "The caller asked you to transfer money"
};

const screens = [...document.querySelectorAll(".screen")];
const demoButton = document.querySelector("#demoButton");
const hangupButton = document.querySelector("#hangupButton");
const safeButton = document.querySelector("#safeButton");
const homeButton = document.querySelector("#homeButton");
const warningOverlay = document.querySelector("#warningOverlay");
const warningReason = document.querySelector("#warningReason");
const warningHangup = document.querySelector("#warningHangup");
const transcript = document.querySelector("#transcript");
const callTimer = document.querySelector("#callTimer");
const summaryText = document.querySelector("#summaryText");

let timerId;
let demoId;
let seconds = 0;
let fraudDetected = false;
let recognition;

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
}

function formatTime(value) {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function findRisk(text) {
  const normalized = text.toLowerCase();
  return Object.entries(riskyTerms).find(([term]) => normalized.includes(term));
}

function triggerWarning(reason) {
  if (fraudDetected) return;
  fraudDetected = true;
  warningReason.textContent = reason;
  warningOverlay.classList.add("visible");
  warningOverlay.setAttribute("aria-hidden", "false");
  if (navigator.vibrate) navigator.vibrate([500, 180, 500, 180, 900]);
  setTimeout(() => {
    warningOverlay.classList.remove("visible");
    warningOverlay.setAttribute("aria-hidden", "true");
    document.querySelector("#listeningTitle").textContent = "Fraud signs detected";
    transcript.textContent = reason;
    document.querySelector("#listeningCard").style.borderColor = "#c52026";
  }, 4200);
}

function inspectSpeech(text) {
  transcript.textContent = `“${text}”`;
  const risk = findRisk(text);
  if (risk) triggerWarning(risk[1]);
}

function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return false;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-IN";
  recognition.onresult = (event) => {
    const heard = [...event.results].slice(event.resultIndex).map((result) => result[0].transcript).join(" ");
    inspectSpeech(heard);
  };
  recognition.onerror = () => { transcript.textContent = "Protection active — demo mode"; };
  try { recognition.start(); return true; } catch { return false; }
}

function startCall() {
  showScreen("callScreen");
  seconds = 0;
  fraudDetected = false;
  callTimer.textContent = "00:00";
  warningOverlay.classList.remove("visible");
  warningOverlay.setAttribute("aria-hidden", "true");
  transcript.textContent = "Listening for signs of fraud";
  document.querySelector("#listeningTitle").textContent = "Checking this call...";
  document.querySelector("#listeningCard").style.borderColor = "#d2d8d3";
  timerId = setInterval(() => { seconds += 1; callTimer.textContent = formatTime(seconds); }, 1000);

  const usingMic = startSpeechRecognition();
  demoId = setTimeout(() => {
    inspectSpeech("Please tell me the OTP sent by your bank");
  }, usingMic ? 7000 : 3500);
}

function endCall(markedSafe = false) {
  clearInterval(timerId);
  clearTimeout(demoId);
  if (recognition) { try { recognition.stop(); } catch {} recognition = null; }
  if (navigator.vibrate) navigator.vibrate(0);
  warningOverlay.classList.remove("visible");
  summaryText.textContent = markedSafe
    ? "This number was marked safe. Future production versions can add it to trusted callers."
    : fraudDetected
      ? "The caller used words commonly linked to fraud. No information was shared."
      : "The call ended before any common fraud words were detected.";
  showScreen("summaryScreen");
}

demoButton.addEventListener("click", startCall);
hangupButton.addEventListener("click", () => endCall(false));
safeButton.addEventListener("click", () => endCall(true));
homeButton.addEventListener("click", () => showScreen("homeScreen"));
warningHangup.addEventListener("click", () => endCall(false));
