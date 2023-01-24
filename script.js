// Selection field element
const fieldEl = document.querySelector(".field");

// FPS
const gameSpeed = 1000/10;

// Field initialization
const field = [];

// Field generation
for(let i = 0; i < 18; i++) {
    field[i] = [];
    for(let j = 0; j < 18; j++) {
        field[i][j] = document.createElement("div");
        field[i][j].classList.add("cell");
        fieldEl.appendChild(field[i][j]);
    }
}

// Snake element creation and initial position
const snakeEl = document.createElement("div");
snakeEl.classList.add("snake");
field[3][3].appendChild(snakeEl);

// Snake game data
const snake = {
    y: 3,
    x: 3,
    bites: 0,
}

// Function for game field update
function update(intervalName) {
    if((snake.y >= 0 && snake.y <= 17) && (snake.x >= 0 && snake.x <= 17)) {
        field[snake.y][snake.x].appendChild(snakeEl);
    } else {
        clearInterval(intervalName);
    }
}

// Function for snake motion
function snakeMotion(keys) {
    switch(keys) {
        case "ArrowUp":
            snake.y--;
            break;
        case "ArrowDown":
            snake.y++;
            break;
        case "ArrowRight":
            snake.x++;
            break;
        case "ArrowLeft":
            snake.x--;
            break;
    }
}

// Key register
let keyRecord = "";

// Keys recording
window.addEventListener("keydown", function(event) {
    if(event.key == "ArrowUp" && keyRecord !== "ArrowDown") {
        keyRecord = event.key;
    } else if(event.key == "ArrowDown" && keyRecord !== "ArrowUp") {
        keyRecord = event.key;
    } else if(event.key == "ArrowRight" && keyRecord !== "ArrowLeft") {
        keyRecord = event.key;
    } else if(event.key == "ArrowLeft" && keyRecord !== "ArrowRight") {
        keyRecord = event.key;
    }
});

// Game timing
let gameTime = setInterval(function() {
    snakeMotion(keyRecord);
    update(gameTime);
    console.log("Update");
}, gameSpeed);