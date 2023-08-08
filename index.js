const gameArea = document.getElementsByClassName("game");
let snake = [[0, 0], [0, 1], [0, 2]]; // Head is the last element
let length = snake.length;
let direction = "right";
let x, y;
let intervalId;
let score = 0;
let key;
let lastTime = Date.now();
let gameStart = false;


function drawBoard() {
    let block;
    for (let i = 0 ; i < 100 ; i++){
        // This block can use once only, should not place outside loop
        block = document.createElement("div");
        block.classList.add("gameblock");
        // Because getby Class return array-like result
        gameArea[0].appendChild(block);
    }
}

function initalSnake() {
    let location;
    for (let i = 0 ; i < length ; i++) {
        location = snake[i][0] * 10 + snake[i][1];
        if (gameArea[0].childNodes[location].className.indexOf("snakebody") == -1) {
            gameArea[0].childNodes[location].classList.add("snakebody");
        }
    }
}

function createFood() {
    let location = Math.floor(Math.random() * 100);
    while (gameArea[0].childNodes[location].className.indexOf("snakebody") != -1) {
        location = Math.floor(Math.random() * 100);
    }
    gameArea[0].childNodes[location].classList.add("food");
}

function upDateSnake() {
    let location, remove;
    switch(true) {
        case direction == "right":
            x = snake[length - 1][0];
            y = snake[length - 1][1] + 1;
            if (!checkLose(x, y)){
                snake.push([x, y]);
                location = x * 10 + y;
                gameArea[0].childNodes[location].classList.add("snakebody");
                if(!checkGetScore(location)){
                    remove = snake.shift();
                    location = remove[0] * 10 + remove[1];
                    gameArea[0].childNodes[location].classList.remove("snakebody");
                } 
            }
            break;
        case direction == "left":
            x = snake[length - 1][0];
            y = snake[length - 1][1] - 1;
            if (!checkLose(x, y)){
                snake.push([x, y]);
                location = x * 10 + y;
                gameArea[0].childNodes[location].classList.add("snakebody");
                if(!checkGetScore(location)){
                    remove = snake.shift();
                    location = remove[0] * 10 + remove[1];
                    gameArea[0].childNodes[location].classList.remove("snakebody");
                } 
            }
            break;
        case direction == "up":
            x = snake[length - 1][0] - 1;
            y = snake[length - 1][1];
            if (!checkLose(x, y)){
                snake.push([x, y]);
                location = x * 10 + y;
                gameArea[0].childNodes[location].classList.add("snakebody");
                if(!checkGetScore(location)){
                    remove = snake.shift();
                    location = remove[0] * 10 + remove[1];
                    gameArea[0].childNodes[location].classList.remove("snakebody");
                } 
            }
            break;
        case direction == "down":
            x = snake[length - 1][0] + 1;
            y = snake[length - 1][1];
            if (!checkLose(x, y)){
                snake.push([x, y]);
                location = x * 10 + y;
                gameArea[0].childNodes[location].classList.add("snakebody");
                if(!checkGetScore(location)){
                    remove = snake.shift();
                    location = remove[0] * 10 + remove[1];
                    gameArea[0].childNodes[location].classList.remove("snakebody");
                } 
            }
            break;
        default:
            break;
    }
}

function checkLose(x, y) {
    let location = x * 10 + y;
    if (x < 0 || x > 9 || y < 0 || y > 9 || (gameArea[0].childNodes[location].className.indexOf("snakebody") != -1)) {
        clearInterval(intervalId);
        alert("You lose and your score is " + score);
        restartGame();
        return true;
    }
    return false;
}

function checkGetScore(location) {
    if (gameArea[0].childNodes[location].className.indexOf("food") != -1){
        score +=1;
        length = snake.length;
        gameArea[0].childNodes[location].classList.remove("food");
        createFood();
        return true;
    } 
    return false;
}

function restartGame() {
    let location;
    for (let i = 0 ; i < length ; i++) {
        location = snake[i][0] * 10 + snake[i][1];
        gameArea[0].childNodes[location].classList.remove("snakebody");
    }
    snake = [[0, 0], [0, 1], [0, 2]];
    length = snake.length;
    direction = "right";
    score = 0;
    initalSnake();
}

function changeDirection(keypress) {
    key = keypress.key;
    let now = Date.now();
    if (key == "Enter") {
        if (gameStart) {
            clearInterval(intervalId);
            gameStart = false;
        }
        else {
            intervalId = setInterval(upDateSnake, 200)
            gameStart = true;
        }
    }
    if ((now - lastTime) > 200) {
        lastTime = now;
        switch(true) {
            case key == "ArrowUp" && direction != "down":
                direction = "up";
                break;
            case key == "ArrowDown" && direction != "up":
                direction = "down";
                break;
            case key == "ArrowLeft" && direction != "right":
                direction = "left";
                break;
            case key == "ArrowRight" && direction != "left":
                direction = "right";
                break;
            default:
                break;
        }
    }
}

drawBoard();
initalSnake();
createFood();
window.addEventListener("keydown", (keypress) => {changeDirection(keypress);});
alert("Press Enter to start/pause the game");
