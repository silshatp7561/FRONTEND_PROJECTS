//dom elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
     {
          question: "What is Eleven's real first name?",
          answers: [
               { text: "annie", correct: false },
               { text: "jane", correct: true },
               { text: "siri", correct: false },
               { text: "el", correct: false },
          ],
     },
     {
          question: "Where is the name of the town where the story takes place?",
          answers: [
               { text: "Riverdale", correct: false },
               { text: "Hawkins", correct: true },
               { text: "Sunnydale", correct: false },
               { text: "Hill Valley", correct: false },
          ],
     },
     {
          question: "What is the name of Eleven's favourite food?",
          answers: [
               { text: "Pancakes", correct: false },
               { text: "Burgers", correct: false },
               { text: "Waffles", correct: true },
               { text: "Pizza", correct: false },
          ],
     },
     {
          question: "What song helps Max escape vecna?",
          answers: [
               { text: "Running up that Hill", correct: true },
               { text: "Take on me", correct: false },
               { text: "Africa", correct: false },
               { text: "Every breath you take", correct: false },
          ],
     },
     {
          question: "What is Dustin's Girlfriends name?",
          answers: [
               { text: "Robin", correct: false },
               { text: "Max", correct: false },
               { text: "suzie", correct: true },
               { text: "Chrissy", correct: false },
          ],
     },
];

////quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
     //reset vars
     currentQuestionIndex = 0;
     score = 0;
     scoreSpan.textContent = 0;

     startScreen.classList.remove("active");
     quizScreen.classList.add("active");

     showQuestion()

}

function showQuestion() {
     answerDisabled = false;
     const currentQuestion = quizQuestions[currentQuestionIndex]
     currentQuestionSpan.textContent = currentQuestionIndex + 1

     const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
     progressBar.style.width = progressPercent + "%"

     questionText.textContent = currentQuestion.question
     answersContainer.innerHTML = "";

     currentQuestion.answers.forEach((answer) => {
          const button = document.createElement("button")
          button.textContent = answer.text
          button.classList.add("answer-btn")

          button.dataset.correct = answer.correct

          button.addEventListener("click", selectAnswer)

          answersContainer.appendChild(button)
     })
}

function selectAnswer(event) {
     if (answerDisabled) return;

     answersDisabled = true
     const selectedButton = event.target;
     const isCorrect = selectedButton.dataset.correct == "true"

     Array.from(answersContainer.children).forEach((button) => {
          if (button.dataset.correct === "true") {
               button.classList.add("correct");
          } else if (button === selectedButton) {
               button.classList.add("incorrect");
          }
     });

     if (isCorrect) {
          score++;
          scoreSpan.textContent = score
     }
     setTimeout(() => {
          currentQuestionIndex++;
          if (currentQuestionIndex < quizQuestions.length) {
               showQuestion()
          } else {
               showResults()
          }
     }, 1000)

}
function showResults() {
     quizScreen.classList.remove("active")
     resultScreen.classList.add("active")

     finalScoreSpan.textContent = score;

     const percentage = (score / quizQuestions.length) * 100

     if (percentage === 100) {
          resultMessage.textContent = "Perfect You Are Well known about STRANGER THINGS!!!"
     } else if (percentage >= 80) {
          resultMessage.textContent = "umm...GreatJob!!"
     }
     else if (percentage >= 60) {
          resultMessage.textContent = "umm...yup..good effort!!"
     }
     else if (percentage >= 40) {
          resultMessage.textContent = "umm...not bad but not good!!"
     } else {
          resultMessage.textContent = "keep Watch series more seriously!!!huhuhu"
     }
}



function restartQuiz() {
     resultScreen.classList.remove("active")
     startQuiz();
}