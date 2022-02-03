var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern  = [];
var userClickedPattern= [];

// To keep the track of whether the game is start or not, we use boolean variable ... 
var started = false;
// To keep the track of in which level you are , we use level variable 
var level = 0;


//  Step : 1 -- when keyboard key is pressed then ,
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

// Note : -- Below function will allow gamer to click one of the buttons given 
$('.btn').click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// a Function which check whether the user clicke answer is match to the gamePattern or not 
function checkAnswer(currentLevel){
    //    console.log( (buttonColours[currentLevel]) );
    //    console.log(gamePattern[gamePattern.length-1]);
    
       if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
       }else {
           playsound("wrong");
           $('body').addClass("game-over");
           $('#level-title').text("❌ Press Key to restart ");
           setTimeout(function(){
               $('body').removeClass("game-over");
           },200);
           restartGame();
       } 
    }
    
// function define to play sound 
const playsound = (name) =>{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
} 

// Step:2  -- function which allow computer itself to choose any of the given button by itself 

function nextSequence(){
    userClickedPattern = [];
    // console.log(level);
    $('#level-title').text("level "+ level);
    // console.log(level);
    level = level+1;  // You can also write level++ here
    const randomNumber =  Math.round(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    
    // Note: using fadeOut and fadeIn , we animate the button with flash 
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    // function to play sound 
    playsound(randomChosenColour);
}  

// Note: FUnction which include animation when the button is clicked by user or computer  
function animatePress(currentcolor){
    $(`.${currentcolor}`).addClass("pressed");
    setTimeout(function(){
        $(`.${currentcolor}`).removeClass("pressed");
    },100);
}

// function when user select wrong btn and would like to restart the game 
function restartGame(){
    // alert("would you like to restart the game");
    level = 0;
    gamePattern = [];
    started = false;
}
