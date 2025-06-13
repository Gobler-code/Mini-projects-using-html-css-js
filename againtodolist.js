let questions = [];
let currentQuestion = 0;
let score = 0;
let totaltime = 60;
let timerInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const interval = document.getElementById("time");

async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
  const data = await res.json();
  questions = data.results.map(q => {
    const allOptions = [...q.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * 4);
    allOptions.splice(randomIndex, 0, q.correct_answer);
    return {
      question: decodeHTML(q.question),
      options: allOptions.map(decodeHTML),
      correct: decodeHTML(q.correct_answer)
    };
  });
  showQuestion();
  startTimer();
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("quiz-option");
    button.textContent = option;
    button.addEventListener("click", (e) => checkAnswer(option,e.target));
    optionsEl.appendChild(button);
  });
}
function startTimer(){
  interval.textContent = `Time left:${totaltime}s`;

  timerInterval = setInterval(()=>{
    totaltime--;
  interval.textContent =`Time left:${totaltime}s`;
    if(totaltime <=0){
      clearInterval(timerInterval);
      showResult()
    }
  },1000);
}


function checkAnswer(selectedOption, clickedbtn) {
  const correctAnswer = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll(".quiz-option");
 

  // Disable all buttons
  buttons.forEach(btn => btn.disabled = true);

  // Highlight correct answer
  buttons.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  // Highlight incorrect if needed
  if (selectedOption !== correctAnswer) {
    clickedbtn.classList.add("incorrect");
  } else {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}


function showResult() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  resultEl.textContent = `Your score is ${score} out of ${questions.length}`;
}



fetchQuestions();
