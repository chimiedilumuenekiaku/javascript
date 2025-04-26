const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", starGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)


let currentQuestionIndex = 0
let totalCorrect = 0



function starGame(){
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex){
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if(answer.correct){
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer .appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while($answersContainer.firstChild){
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")

}

// Choisir la reponse
function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct){
        document.body.classList.add("correct")
        totalCorrect++
    }else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct){
            button.classList.add("correct")
        }else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = " "

    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Muito bom :)"
            break
        case (performance >= 50):
            message ="Bom :)"
            break
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML = 
    `
        <p class="final-message">
            Voçe acertou ${totalCorrect} de ${totalQuestion} questões!
            <span>Resultado: ${message}</span>
        </p>
        <button onclick=window.location.reload() class="button">
            Refazer teste
        </button>

    `
}









const questions = [
    {
        question: "Dentro de qual elemento HTML colocamos o Javascript?", 
        answers: [
            {text: "<javascript>", correct: false},
            {text: "<js>", correct: false},
            {text: "<script>", correct: true},
            {text: "<javascript>", correct: false},
        ]
    },
    {
        question: "Onde é o lugar correto para inserir Javascript?", 
        answers: [
            {text: "Tanto no <head> quanto no <body> esta correto", correct: true},
            {text: "No <body>", correct: false},
            {text: "No <head>", correct: false},
            {text: " Em outro lugar", correct: false},
        ]
    },
    {
        question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"', 
        answers: [
            {text: '<script src="xxx.js">', correct: true},
            {text: '<script href="xxx.js">', correct: false},
            {text: '<scriptvname="xxx.js">', correct: false},
            {text: "Nenhuma alternativas", correct: false},
        ]
    }  
]