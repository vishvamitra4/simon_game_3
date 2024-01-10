let game_pattern = [];
let user_pattern = [];
let colors = ["blue", "green", "red", "yellow"];
let level = 0;
let highScore = 0;
let flag = false;


// Start the game...

const btn = document.getElementById("btn-start").addEventListener('click', (e) => {

    if (flag === false) {
        flag = true;
        NextSequence();
        e.target.innerHTML = "Quit";
        e.target.classList.add("quit");
    }
    else {
        Restart();
    }


})


/// NextSequence..
const NextSequence = function () {
    level++;
    document.getElementById("level-title").innerHTML = "Level : " + level;
    let random = Math.floor(Math.random() * 4);
    let level_color = colors[random];
    let S = document.getElementById(level_color).style;
    S.opacity = 0;
    (function fade() {
        (S.opacity -= -0.1) < 1 && setTimeout(fade, 50);
    })();
    PlaySound(level_color);
    game_pattern.push(level_color);
}



/// Selecting the colors..

$(".btn").on("click" , (e)=>{

    if(flag)
    {
        var choosen_color = e.target.id;
        user_pattern.push(choosen_color);
        Animate(choosen_color);
        CheckingAnswer(user_pattern.length);
    }

});


/// Checking Anser...

function CheckingAnswer(count)
{
    if(game_pattern[count - 1] === user_pattern[count - 1])
    {
        if(game_pattern.length === count)
        {
            user_pattern = [];
            document.getElementById("your_score").innerHTML = "Your Score : " + level;
            setTimeout(()=>NextSequence() , 800);
        }
    }
    else{
        Restart();
    }
}


//// Restart The Game....

function Restart()
{
    flag = false;
    document.getElementById("btn-start").classList.remove("quit");
    document.getElementById("btn-start").innerHTML = "Start";

    document.getElementById("level-title").innerHTML = `Wrong Your Score : ${level - 1}`;
    PlaySound("wrong");

    document.querySelector("body").classList.add("game-over");

    setTimeout(()=>{
        document.querySelector("body").classList.remove("game-over");
    } , 200);


    if(level - 1 > highScore)
    {
        highScore = level - 1;
        document.getElementById("high_score").innerHTML = `High Score : ${highScore}`;
    };


    level = 0;
    document.getElementById("your_score").innerHTML = `Your Score : ${level}`;
    user_pattern = [];
    game_pattern = [];

}





/// Animating the Color..

function Animate(color)
{
    document.getElementById(color).classList.add("pressed");
    setTimeout(()=>{
        document.getElementById(color).classList.remove("pressed");
    } , 100);
};




/// Playing Sound...

function PlaySound(name) {
    switch (name) {
        case "green":
            var aud = new Audio('sounds/green.mp3');
            aud.play();
            break;
        case "blue":
            var aud = new Audio('sounds/blue.mp3');
            aud.play();
            break;
        case "red":
            var aud = new Audio('sounds/red.mp3');
            aud.play();
            break;
        case "yellow":
            var aud = new Audio('sounds/yellow.mp3');
            aud.play();
            break;
        case "wrong":
            var aud = new Audio('sounds/wrong.mp3');
            aud.play();
            break;

    };
};
