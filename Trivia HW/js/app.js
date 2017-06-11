var startScreen;
var gameHTML;
var counter = 30;

var questions = ["What is starter pokemon that is a fire type?", "What is starter pokemon that is a grass type?", "What is starter pokemon that is a water type?", "What is starter pokemon that is a electric type?", "Who is Brocks strongest pokemon?", "What is the first pokemon Misty use's in her gym battle?", "'What is the name of Ash's rival?"];

var answerArray = [["Charmander", "Bulbasaur", "Squirtle", "Pikachu"], ["Charmander", "Bulbasaur", "Pikachu", "Squirtle"], ["Charmander", "Bulbasaur", "Pikachu", "Squirtle"], ["Charmander", "Bulbasaur", "Squirtle", "Pikachu"], ["Onyx", "Geodude", "Squirtle", "Pikachu"], ["Goldeen", "Garados", "Starmie", "Magikarp"], ["Red", "Blue", "Gary", "May"]];

var imageArray =
["<img class='center-block img-right' src='images/Charmander.jpg'>",
"<img class='center-block img-right' src='images/Bulbasaur.jpg'>",
"<img class='center-block img-right' src='images/Squirtle.png'>",
"<img class='center-block img-right' src='images/pikachu.jpg'>",
"<img class='center-block img-right' src='images/onyx.jpg'>",
"<img class='center-block img-right' src='images/goldeen.jpg'>",
 "<img class='center-block img-right' src='images/gary.jpg'>"];

var correctAnswers = ["A. Charmander", "B. Bulbasaur", "D. Squirtle", "D. Pikachu", "A. Onyx", "A. Goldeen", "C. Gary"];


var i = 0;
var answer;
var timer;
var numCorrect = 0;
var numIncorrect = 0;
var timedOut = 0;

$(document).ready(function() {

    function starterScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start</a></p>";
        $(".mainArea").html(startScreen);
    }

    starterScreen();


    $("body").on("click", ".start-button", function(event){
        event.preventDefault();

        print();
        timer_1();

    });

    $("body").on("click", ".answer", function(event){

        answer = $(this).text();

        if(answer === correctAnswers[i]) {


            clearInterval(timer);
            win();
        }
        else {

            clearInterval(timer);
            loss();
        }
    });

    $("body").on("click", ".reset-button", function(event){

        resetGame();
    });

});

function timeOut() {
    timedOut++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[i] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(pause, 4000);
}

function win() {
    numCorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[i] + "</p>" + imageArray[i];
    $(".mainArea").html(gameHTML);
    setTimeout(pause, 4000);
}

function loss() {
    numIncorrect++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[i] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>" + "<img class='center-block img-right' src='images/incorrect.gif'>";
    $(".mainArea").html(gameHTML);
    setTimeout(pause, 4000);
}

function print() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[i] + "</p><p class='first-answer answer'>A. " + answerArray[i][0] + "</p><p class='answer'>B. "+answerArray[i][1]+"</p><p class='answer'>C. "+answerArray[i][2]+"</p><p class='answer'>D. "+answerArray[i][3]+"</p>";
    $(".mainArea").html(gameHTML);
}

function pause() {
    if (i < 7) {
        i++;
        print();
        counter = 30;
        timer_1();
    }
    else {
        endScreen();
    }
}

function timer_1() {
    timer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(timer);
            timeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function endScreen() {
    gameHTML = "<p class='text-center timer-p'>Time: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Times Up! Results: " + "</p>" + "<p class='summary-correct'>Number Correct: " + numCorrect + "</p>" + "<p>Number Incorrect: " + numIncorrect + "</p>" + "<p>Blank: " + timedOut + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    i = 0;
    numCorrect = 0;
    numIncorrect = 0;
    timedOut = 0;
    counter = 30;
    print();
    timer_1();
}
