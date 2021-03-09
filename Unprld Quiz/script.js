const questionToBeAsked = "Which player do you prefer?";
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const resultContainer = document.getElementById("result-container");

const resultElement1 = document.getElementById("yoyo-result-1");
const resultElement2 = document.getElementById("yoyo-result-2");
const resultElement3 = document.getElementById("yoyo-result-3");
const resultElement4 = document.getElementById("yoyo-result-4");
const resultElement5 = document.getElementById("yoyo-result-5");

const answerButtonElement = document.getElementById("answer-buttons");

var user = {
    Flashback: 0,
    Recognition: 0,
    Elevation: 0,
    Nostalgia: 0,
    Reduction: 0
}

let shuffledQuestions, questionIdx;

startButton.addEventListener("click", startQuiz);

function startQuiz(){
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    questionIdx = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[questionIdx]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        button.addEventListener("click", selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetState(){
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    countAnswer(selectedButton.innerText);

    questionIdx++;
    if(questionIdx == shuffledQuestions.length){
        endQuiz();
    }
    else{
        setNextQuestion();
    }
}

function countAnswer(answer){
    let yoyo = playerDict[answer];
    if(yoyo == "flashback")
        user["Flashback"]++;
    if(yoyo == "recognition")
        user["Recognition"]++;
    if(yoyo == "elevation")
        user["Elevation"]++;
    if(yoyo == "nostalgia")
        user["Nostalgia"]++;
    if(yoyo == "reduction")
        user["Reduction"]++;
}

function endQuiz(){
    // clear questions
    questionContainer.classList.add("hide");
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }

    // update result
    updateGraph();

    // show result container    
    resultContainer.classList.remove("hide");
}

function updateGraph(){
    var userStats = [];
    var i = 0;

    // Create items array
    for(element in user){
        userStats[i] = [element, user[element]];
        i++;
    }

    createArray(userStats);

    // update graph
    for(i=0; i<5; i++){
        updateElement(userStats, i);
    }
}

function updateElement(userStats, i){
    var barWidth = userStats[i][1]*18 + "%";

    if(i==0)
        updateElement1(userStats[i], barWidth);
    if(i==1)
        updateElement2(userStats[i], barWidth);
    if(i==2)
        updateElement3(userStats[i], barWidth);
    if(i==3)
        updateElement4(userStats[i], barWidth);
    if(i==4)
        updateElement5(userStats[i], barWidth);
}

function updateElement1(statArr, barWidth){
    resultElement1.style.width = barWidth;
    document.getElementById("yoyo1").innerHTML = statArr[0];
    // console.log(statArr[0]);
    // console.log(statArr[1]);
}

function updateElement2(statArr, barWidth){
    resultElement2.style.width = barWidth;
    document.getElementById("yoyo2").innerHTML = statArr[0];
    // console.log(statArr[0]);
    // console.log(statArr[1]);
}

function updateElement3(statArr, barWidth){
    resultElement3.style.width = barWidth;
    document.getElementById("yoyo3").innerHTML = statArr[0];
    // console.log(statArr[0]);
    // console.log(statArr[1]);
}

function updateElement4(statArr, barWidth){
    resultElement4.style.width = barWidth;
    document.getElementById("yoyo4").innerHTML = statArr[0];
    // console.log(statArr[0]);
    // console.log(statArr[1]);
}

function updateElement5(statArr, barWidth){
    resultElement5.style.width = barWidth;
    document.getElementById("yoyo5").innerHTML = statArr[0];
    // console.log(statArr[0]);
    // console.log(statArr[1]);
}

function createArray(userStats)
{
    userStats.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }
}

function getCustomYoyo()
{
    let bestYoyo;
    let max = 0;

    for(element in user)
    {
        if(user[element] > max){
            max = user[element];
            bestYoyo = element;
        }
    }

    return bestYoyo;
}

let questions = [
    {
        question: questionToBeAsked,
        answers: [
            { text: "Tetsuto Kato" },
            { text: "Remy Baskin" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Aidan Cioch" },
            { text: "Yuki Nishisako" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Patrick Canny" },
            { text: "Evan Nagao" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Gentry Stein" },
            { text: "Keiran Cooper" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Yuuki Spencer" },
            { text: "Zach Gormley" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Arata Imai" },
            { text: "Jason Liu" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Daniel Kim" },
            { text: "Sid Seed" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Iori Yamaki" },
            { text: "Tsukasa Takatsu" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Shuyun Tang" },
            { text: "Colin Beckford" }
        ]
    },
    {
        question: questionToBeAsked,
        answers: [
            { text: "Nick De Valpine" },
            { text: "Isaac Sams" }
        ]
    }
]

var playerDict = {
    "Tetsuto Kato": "flashback",
    "Yuki Nishisako": "flashback",
    "Keiran Cooper": "flashback",
    "Iori Yamaki": "flashback",

    "Remy Baskin": "recognition",
    "Aidan Cioch": "recognition",
    "Gentry Stein": "recognition",
    "Jason Liu": "recognition",

    "Patrick Canny": "elevation",
    "Zach Gormley": "elevation",
    "Daniel Kim": "elevation",
    "Colin Beckford": "elevation",

    "Shuyun Tang": "nostalgia",
    "Arata Imai": "nostalgia",
    "Evan Nagao": "nostalgia",
    "Nick De Valpine": "nostalgia",

    "Yuuki Spencer": "reduction",
    "Sid Seed": "reduction",
    "Tsukasa Takatsu": "reduction",
    "Isaac Sams": "reduction"
};

////////////////////////////////////////// useless stuff /////////////////// yo-player reference ///////////////////

// feel 0(floaty) to 10(solid)
// speed 0(slow) to 10(fast)
// size 0(small) to 10(big)
function Yoyo(name, feel, speed, size){
    this.name = name;
    this.feel = feel;
    this.speed = speed;
    this.size = size;
}
let flashback = new Yoyo("flashback", 8, 10, 8);
let recognition = new Yoyo("recognition", 9, 5, 8);
let elevation = new Yoyo("elevation", 1, 17, 9);
let nostalgia = new Yoyo("nostalgia", 5, 9, 9);
let reduction = new Yoyo("reduction", 6, 6, 5);

// each yoyo is mapped to its name
let yoMap = new Map();
yoMap["flashback"] = flashback;
yoMap["recognition"] = recognition;
yoMap["elevation"] = elevation;
yoMap["nostalgia"] = nostalgia;
yoMap["reduction"] = reduction;