/* Global variables */
let SCORE;
let RAND_QUES;
let NUMS;

/**********************************************/

const scoreBoard = document.querySelector(".score-board");
const scoreVal = document.querySelector("#score");
const questionBox = document.querySelector(".question-box");
const optionBox = document.querySelector(".option-wrapper");
const playBtn = document.querySelector(".play-btn");
const exitBtn = document.querySelector(".exit-btn");

/**********************************************/

const optionsBtns = document.querySelectorAll(".option-text"); //for all 4 option's text


const optionsSelection = document.querySelectorAll("#opt-btn")
/**********************************************/

function playSetup(){
    SCORE = 0;
    RAND_QUES = -1;
    playBtn.style.display = "block";
    questionBox.style.display = "none";
    optionBox.style.display = "none";
    exitBtn.style.display = "none";
    scoreBoard.style.display = "none";
    NUMS = numArray(0, 6); // for 7 total questions
}

function starGame(){
    scoreVal.innerHTML = SCORE;
    questionBox.style.display = "block";
    optionBox.style.display = "flex";
    exitBtn.style.display = "block";
    scoreBoard.style.display = "block";
    question.quizPlay();
}

playBtn.addEventListener('click', function(){
    this.style.display = "none";
    starGame();
})

exitBtn.addEventListener('click', function(){
    playSetup();
})

/************ Question Section ******************/
let questionColl = [];
let optionColl = [];
const answerColl = [1, 2, 3, 3, 0, 2, 1]; // correct answer of the following quiz questions

/********************* Question *****************/
questionColl[0] = "which one is the first search engine in internet?";
optionColl[0] = {
    options: ['Google', 'Archie', 'Altavista', 'WAIS']
};

questionColl[1] = "Number of bit used b the PPv6 address: ";
optionColl[1] = {
    options: ['32 bit', '64 bit', '128 bit', '256 bit']
};

questionColl[2] = "which one is the first web broser invented in 1990?";
optionColl[2] = {
    options: ['Internet Explorer', 'Mosaic', 'Mozila', 'Nexus']
};

questionColl[3] = "In which year '@' sign was first chosen for its use in email address?";
optionColl[3] = {
    options: ['1976', '1980', '1977', '1972']
};

questionColl[4] = "Which key combination is used to permanenlty delete a file or folder?";
optionColl[4] = {
    options: ['Shift + Del', 'Alt + Del', 'Ctrl + Del', "Del"]
};

questionColl[5] = "Which company first developed the Java programming language?";
optionColl[5] = {
    options: ['Microsoft', 'Google', 'Sun Microsystems', 'IBM']
};

questionColl[6] = "Who is know as the founder of IBM company?";
optionColl[6] = {
    options: ['Steve jobs', 'Thomas J. Watson', 'Nolan Bushnell', 'Alan Turing']
};
/****************** end of question *************/

let quizQuestion = function(question, optionList, correctAns){
    this.question = question;
    this.optionList = optionList;
    this.correctAns = correctAns;
}

let question = new quizQuestion(questionColl, optionColl, answerColl)

/****************** end of question *************/

/*** generate unique random numbers for unique questions  ***/

function numArray(start, end){
    let numList = [];
    for (let i = start; i < end; i++){
        numList.push(i);
    }
    return numList;
}

function randValueGen(min, max){
    let temp = Math.random() * (max - min + 1);
    let result = Math.floor(temp) + min;
    return result;
}

/******************  *************/

quizQuestion.prototype.quizPlay = function(){
    let randIndex = randValueGen(0, NUMS.length - 1);
    RAND_QUES = NUMS[randIndex];

    NUMS.splice(randIndex, 1);

    // for random question display in the question box
    document.getElementById('question').innerHTML = this.question[RAND_QUES];

    // for displaying the options for above question
    this.optionList[RAND_QUES].options.forEach(function(option, idx){
        optionsBtns[idx].innerHTML = option;
    })
}






















playSetup();

