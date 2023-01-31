// Selection field element
const fieldEl = document.querySelector(".field");

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
};

// Snake element
const snakeEl = '<div class="snake"></div>';

// Apple element
const foodEl = '<div class="food"></div>';

// Sound effect
const eatingEffect = new Audio("media/eating_effect.mp3");
const hitEffect = new Audio("media/hit_effect.mp3");
eatingEffect.volume = 0.15;
hitEffect.volume = 0.15;

// Game speed
const gameSpeed = 1000/10;

// Snake speed direction
let speedY = 0;
let speedX = 0;

// Snake game data
const snake = {
    y: 3,
    x: 3,
    body: []
};

// Food generation
newFood();

// Function for game field update
function update(intervalName) {
    // Snake head updated position
    snake.y += speedY;
    snake.x += speedX;
    if((snake.y >= 0 && snake.y <= 17) && (snake.x >= 0 && snake.x <= 17)) {
        // Delete snake parts from field
        if(snake.body.length) {
            for(let i = 0; i < snake.body.length; i++) {
                field[snake.body[i][0]][snake.body[i][1]].innerHTML = "";
            };
        };
        // Eating food logic
        let foodEaten = false;
        if(field[snake.y][snake.x].children[0]) {
            // Eating audio effect
            eatingEffect.play();
            field[snake.y][snake.x].children[0].remove();
            foodEaten = true;
        };
        // Push a new updated head with last coordinates to array
        snake.body.unshift([snake.y, snake.x]);
        // Remove the last part of tail form array
        if((snake.body.length > 1) && !foodEaten) {
            snake.body.pop();
        };
        // Draw all the snake body in the field
        for(let i = 0; i < snake.body.length; i++) {
            field[snake.body[i][0]][snake.body[i][1]].innerHTML += snakeEl;
        };
        // Food generation
        foodEaten && newFood();
        // Game interruption if snake touch the tail
        if(field[snake.y][snake.x].children[1]) {
            // Hit audio effect
            hitEffect.play();
            for(let i = 0; i < snake.body.length; i++) {
                field[snake.body[i][0]][snake.body[i][1]].children[0].classList.add("hit");
            };
            clearInterval(intervalName);
        }
    } else {
        // Hit audio effect
        hitEffect.play();
        // Game interruption if snake touch walls
        for(let i = 0; i < snake.body.length; i++) {
            field[snake.body[i][0]][snake.body[i][1]].children[0].classList.add("hit");
        };
        clearInterval(intervalName);
    };
};

// Function for food generation
function newFood() {
    // Generating food position
    let foodY = Math.floor(Math.random() * 18);
    let foodX = Math.floor(Math.random() * 18);
    // Checking if food position is already taken
    while(field[foodY][foodX].childElementCount == 1) {
        foodY = Math.floor(Math.random() * 18);
        foodX = Math.floor(Math.random() * 18);
    };
    // Draws food in field
    field[foodY][foodX].innerHTML = foodEl;
};

// Keys and speed recording
let keyRecord = "";
window.addEventListener("keydown", function(event) {
    if(event.key == "ArrowUp" && keyRecord !== "ArrowDown") {
        speedY = -1;
        speedX = 0;
        keyRecord = event.key;
    } else if(event.key == "ArrowDown" && keyRecord !== "ArrowUp") {
        speedY = 1;
        speedX = 0;
        keyRecord = event.key;
    } else if(event.key == "ArrowRight" && keyRecord !== "ArrowLeft") {
        speedY = 0;
        speedX = 1;
        keyRecord = event.key;
    } else if(event.key == "ArrowLeft" && keyRecord !== "ArrowRight") {
        speedY = 0;
        speedX = -1;
        keyRecord = event.key;
    };
});

// Run game
let gameTime = setInterval(function() {
    update(gameTime);
}, gameSpeed);