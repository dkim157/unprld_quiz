const questionText = "Which player do you prefer?";
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const resultContainer = document.getElementById("result-container");
const container = document.getElementById("container");

const resultElement1 = document.getElementById("yoyo-result-1");
const resultElement2 = document.getElementById("yoyo-result-2");
const resultElement3 = document.getElementById("yoyo-result-3");
const resultElement4 = document.getElementById("yoyo-result-4");
const resultElement5 = document.getElementById("yoyo-result-5");

let resultArr = [resultElement1, resultElement2, resultElement3, resultElement4, 
    resultElement5];

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
    container.classList.remove("hide");
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
    countAnswer(e.target.innerText);

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
    user[yoyo]++;
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

    createArray(userStats);

    // update graph
    for(i=0; i<5; i++){
        updateElement(userStats, i);
    }
}

function createArray(userStats)
{
    var i = 0;
    
    // populate array
    for(element in user)
    {
        userStats[i] = [element, user[element]];
        i++;
    }

    //sort array
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

function updateElement(userStats, i){
    var barWidth = userStats[i][1]*18 + "%";

    resultArr[i].style.width = barWidth;
    document.getElementById("yoyo" + (i+1)).innerHTML = userStats[i][0];
}

function Queue() {
    this.elements = [];
}
Queue.prototype.enqueue = function (e) {
    this.elements.push(e);
};
Queue.prototype.dequeue = function () {
    return this.elements.shift();
};
Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let fbQ = new Queue();
fbQ.elements = ["Tetsuto Kato", "Yuki Nishisako", "Keiran Cooper", "Iori Yamaki"];
shuffleArray(fbQ.elements);

let recogQ = new Queue();
recogQ.elements = ["Remy Baskin", "Colin Beckford", "Gentry Stein", "Jason Liu", 
    "Park Jun Sang"];
shuffleArray(recogQ.elements);

let elevQ = new Queue();
elevQ.elements = ["Patrick Canny", "Zach Gormley", "Daniel Kim", "Aidan Cioch"];
shuffleArray(elevQ.elements);

let nosQ = new Queue();
nosQ.elements = ["Shuyun Tang", "Arata Imai", "Evan Nagao", "Nick De Valpine", 
    "In Hyeok Choi"];
shuffleArray(nosQ.elements);

let reducQ = new Queue();
reducQ.elements = ["Yuuki Spencer", "Sid Seed", "Tsukasa Takatsu", "Isaac Sams",
    "Abel Feher"];
shuffleArray(reducQ.elements);

let questions = [
    {
        question: questionText,
        answers: [
            { text: fbQ.dequeue() },
            { text: recogQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: elevQ.dequeue() },
            { text: fbQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: fbQ.dequeue() },
            { text: nosQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: reducQ.dequeue() },
            { text: fbQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: recogQ.dequeue() },
            { text: elevQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: elevQ.dequeue() },
            { text: nosQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: recogQ.dequeue() },
            { text: reducQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: elevQ.dequeue() },
            { text: nosQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: reducQ.dequeue() },
            { text: recogQ.dequeue() }
        ]
    },
    {
        question: questionText,
        answers: [
            { text: nosQ.dequeue() },
            { text: reducQ.dequeue() }
        ]
    }
]

var playerDict = {
    "Tetsuto Kato": "Flashback",
    "Yuki Nishisako": "Flashback",
    "Keiran Cooper": "Flashback",
    "Iori Yamaki": "Flashback",

    "Remy Baskin": "Recognition",
    "Colin Beckford": "Recognition",
    "Gentry Stein": "Recognition",
    "Jason Liu": "Recognition",
    "Park Jun Sang": "Recognition",

    "Patrick Canny": "Elevation",
    "Zach Gormley": "Elevation",
    "Daniel Kim": "Elevation",
    "Aidan Cioch": "Elevation",

    "Shuyun Tang": "Nostalgia",
    "Arata Imai": "Nostalgia",
    "Evan Nagao": "Nostalgia",
    "Nick De Valpine": "Nostalgia",
    "In Hyeok Choi": "Nostalgia",

    "Yuuki Spencer": "Reduction",
    "Sid Seed": "Reduction",
    "Tsukasa Takatsu": "Reduction",
    "Isaac Sams": "Reduction",
    "Abel Feher": "Reduction"
};