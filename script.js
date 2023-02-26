document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("grid div");
    const scoreDisplay = document.querySelector("span");
    const startBtn = document.querySelector("start");

    const width = 10;
    let currentIndex = 0; //first div in our grid
    let appleIndex = 0; //first div in our grid
    let currentSnake = [2, 1, 0]; //2 is the HEAD, 0 is tail
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start, restart the game
    function startGame() {
        currentSnake.forEach((index) =>
            squares[index].classList.remove("snake")
        );
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        //random Apple
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach((index) => squares[index].classList.add("snake"));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //Different results of moves
    function moveOutcomes() {
        //snake hits the border or self
        if (
            (currentSnake[0] + width >= width * width && direction === width) || // snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // snake hits the top
            squares[currentSnake[0] + direction].classList.contains("snake") // snake hits itself
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove("snake")
        currentSnake.unshift(currentSnake[0] + direction)   //gives direction to the head of the array

        //snake getts apple
        if(squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail)
            //randomApple
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime + speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
       squares[currentSnake[0]].classList.add("snake")

    }

    //assign functions to decodes
    function control(e) {
        //squares[currentIndex].classList.remove("snake");

        if (e.key === "ArrowRight") {
            direction = 1;
            console.log("right arrow is working"); //if we press the right arrow on our keyboard, the snake will turn right
        } else if (e.key === "ArrowUp") {
            direction = -width;
            console.log("up arrow is working"); // if we press the up arrow, the snake will go back 10 divs, appearing to go up
        } else if (e.key === "ArrowLeft") {
            direction = -1;
            console.log("left arrow is working"); // if we press left arrow, the snake will go left one div
        } else if (e.key === "ArrowDown") {
            direction = +width;
            console.log("down arrow is working"); // if we press down, the snake will appear ten divs from you are now
        }
    }
    document.addEventListener("keyup", control);
});
