
let player_score = 0;
var game_intervel;
var game_speed = 300;
let level_Val = 0;

// const value = console.log(value);


const play = document.querySelector(".play-board");
const score = document.querySelector(".score");
const level = document.querySelector(".level");
const high_score = document.querySelector(".high-score");

const create_div = () => {

    // console.log("d");
    score.innerHTML = `score = ${player_score}`;
    level.innerHTML = `level = ${level_Val}`;

    if (localStorage.getItem('High_Score') === null) {
        localStorage.setItem('High_Score', 0);
    }
    else if (player_score < localStorage.getItem('High_Score')) {
        high_score.innerHTML = `high-score = ${localStorage.getItem('High_Score')}`;
    }
    else {
        localStorage.setItem('High_Score', player_score);
        high_score.innerHTML = `high-score = ${localStorage.getItem('High_Score')}`;

    }


}

const inc_scor = () => {

    player_score += 10;


    if (player_score % 20 == 0) {

       
        if (game_speed - 20 > 0 && player_score != 0) {
            level_Val += 1;
            game_speed -= 30;
            clearInterval(game_intervel);
            game_intervel =  setInterval(init_game,game_speed);
            console.log(game_speed);
        }


    }


}

let cnt = 0;
var foodX, foodY;
let posX = 1;
let posY = 1;
let valX = 0, valY = 0;
let snakeBody = [];

const foodPosition = () => {

    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

    //init_game();
}
foodPosition();
const check = () => {
    if (posX > 30 || posY > 30 || posY < 0 || posX < 0) {
        valX = 0;
        valY = 0;
        posX = 1;
        posY = 1;
        level_Val = 0;
        player_score = 0;
        
        clearInterval(game_intervel);
        game_intervel =  setInterval(init_game,300);
        snakeBody = [];
        create_div();

    }
}
//this function is called after 1000ms
const init_game = () => {

    // console.log(game_speed);

    cnt++;
    let food = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (foodX === posX && foodY === posY) {
        foodPosition();
        inc_scor();
        create_div();
        snakeBody.push([foodX, foodY]);

       

    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [posX, posY];

    posX += valX;
    posY += valY;
    // console.log(posX + " " + posY);

    for (let i = 0; i < snakeBody.length; i++) {
        // console.log("count cnt" + cnt + "-> " + snakeBody[i][1] + " " + snakeBody[i][0]);
        food += `<div class="snake" style = "grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    }



    play.innerHTML = food;
    check();


}

const changePOS = (e) => {
    if (e.key === "ArrowDown") {
        valY = 1;
        valX = 0;
        // console.log(e.key);
    }
    else if (e.key === "ArrowUp") {
        valY = -1;
        valX = 0;
        //console.log(e.key);

    }
    else if (e.key === "ArrowRight") {
        valY = 0;
        valX = 1;
        //console.log(e.key);

    }
    else if (e.key === "ArrowLeft") {
        valY = 0;
        valX = -1;
        //console.log(e.key);

    }

}
create_div();
document.addEventListener("keydown", changePOS);


game_intervel = setInterval(init_game, game_speed); 
// console.log(game_speed);

