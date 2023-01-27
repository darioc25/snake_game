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
}

// FPS
const gameSpeed = 1000/10;

// Snake speed
let speedY = 0;
let speedX = 0;

// Snake game data
const snake = {
    y: 3,
    x: 3,
    body: []
}

// Food generation
newFood();

let snakeParts = [];
// Function for game field update
function update(intervalName) {
    // Snake head updated position
    snake.y += speedY;
    snake.x += speedX;
    if((snake.y >= 0 && snake.y <= 17) && (snake.x >= 0 && snake.x <= 17)) {

        // Clear snake parts in the field
        if(snakeParts.length > 0) {
            for(let i = 0; i < snakeParts.length; i++) {
                snakeParts[i].remove();
            }
            snakeParts = [];
        };

        // Eating food logic
        let foodEaten = false;
        if(field[snake.y][snake.x].children[0]?.classList == "food") {
            field[snake.y][snake.x].children[0].remove();
            foodEaten = true;
            newFood();
        };

        // Push a new head with updated coordinates to array
        snake.body.unshift([snake.y, snake.x]);

        // Remove the last part of tail form array
        if((snake.body.length > 1) && !foodEaten) {
            snake.body.pop();
        };

        // Draw all the snake body in the field
        for(let i = 0; i < snake.body.length; i++) {
            snakeParts[i] = document.createElement("div");
            snakeParts[i].classList.add("snake");
            field[snake.body[i][0]][snake.body[i][1]].appendChild(snakeParts[i]);
        };

        if(field[snake.y][snake.x].children[1]?.classList == "snake") {
            clearInterval(intervalName);
        }

    } else {
        // Game running interruption
        clearInterval(intervalName);
    }
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
    }
    // Creating food element and draws it in field
    const foodEl = document.createElement("div");
    foodEl.classList.add("food");
    field[foodY][foodX].appendChild(foodEl);
};

// Snake element creation and position initialization
function drawSnake(posY, posX, snakePart) {
    field[posY][posX].appendChild(snakePart);
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
    }
});

// Run game
let gameTime = setInterval(function() {
    update(gameTime);
}, gameSpeed);