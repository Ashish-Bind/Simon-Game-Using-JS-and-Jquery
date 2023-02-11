let userClickedPattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let level = 0;
let started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumberFunction = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumberFunction];
    gamePattern.push(randomChosenColor);


    // For Animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // For Audio File
    playSound(randomChosenColor);

}

$('.btn').click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    let audioFile = new Audio('sounds/' + name + '.mp3');
    audioFile.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

$(document).keydown(function (event) {
    if (!started) {
        $("#level-title").text('Level ' +level);
        nextSequence();
        started=true;
    }
});


// Logic For Checking The Answer 
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('Success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log('Wrong');
        playSound('wrong')
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $("#level-title").text('Game Over, Press Any Key To Continue.');
        $("#level-title").css("font-size", "2rem");
        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}