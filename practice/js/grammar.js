let questions = [];
let current = 0, score = 0, time = 15 * 60;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");

async function loadQuestions() {
  const res = await fetch("data/grammar.json");
  questions = await res.json();
  loadQuestion();
  startTimer();
}

function startTimer() {
  const interval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerEl.textContent = `⏳ Time left: ${minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
    if (time <= 0) {
      clearInterval(interval);
      endQuiz();
    }
    time--;
  }, 1000);
}

function loadQuestion() {
  if (current >= questions.length) {
    endQuiz();
    return;
  }
  progressEl.textContent = `Question ${current+1} of ${questions.length}`;
  questionEl.textContent = questions[current].q;
  optionsEl.innerHTML = "";
  questions[current].options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${i}"> ${opt}`;
    optionsEl.appendChild(label);
  });
}

function nextQuestion() {
  const selected = document.querySelector("input[name='option']:checked");
  if (selected) {
    if (parseInt(selected.value) === questions[current].answer) score++;
  }
  current++;
  loadQuestion();
}

function endQuiz() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.textContent = `✅ Your score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestions();
