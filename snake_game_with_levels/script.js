// script.js
$(document).ready(function () {
    let snake = [{ x: 1, y: 1 }];
    let food = { x: 10, y: 10 };
    let direction = { x: 1, y: 0 };
    let boardSize = 20;
    let gameSpeed = 300;  // Default speed for "easy"
    let gameInterval;

    // Function to set the level based on user choice
    function setLevel(level) {
        switch (level) {
            case 'easy':
                gameSpeed = 300;
                boardSize = 20;
                break;
            case 'medium':
                gameSpeed = 200;
                boardSize = 25;
                break;
            case 'hard':
                gameSpeed = 150;
                boardSize = 30;
                break;
        }

        // Update the game board grid size based on the level
        $('#gameBoard').css({
            'grid-template-columns': `repeat(${boardSize}, 20px)`,
            'grid-template-rows': `repeat(${boardSize}, 20px)`
        });
    }

    // Function to draw the snake and food
    function drawSnake() {
        $('#gameBoard').empty();
        snake.forEach(segment => {
            $('<div>')
                .addClass('snake')
                .css({
                    'grid-column-start': segment.x,
                    'grid-row-start': segment.y,
                })
                .appendTo('#gameBoard');
        });

        $('<div>')
            .addClass('food')
            .css({
                'grid-column-start': food.x,
                'grid-row-start': food.y,
            })
            .appendTo('#gameBoard');
    }

    // Function to move the snake
    function moveSnake() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = {
                x: Math.floor(Math.random() * boardSize) + 1,
                y: Math.floor(Math.random() * boardSize) + 1,
            };
        } else {
            snake.pop();
        }

        if (head.x < 1 || head.y < 1 || head.x > boardSize || head.y > boardSize) {
            alert('Game Over!');
            clearInterval(gameInterval);
            resetGame();
        }

        drawSnake();
    }

    // Event listeners for arrow keys
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left arrow
                if (direction.x !== 1) direction = { x: -1, y: 0 };
                break;
            case 38: // up arrow
                if (direction.y !== 1) direction = { x: 0, y: -1 };
                break;
            case 39: // right arrow
                if (direction.x !== -1) direction = { x: 1, y: 0 };
                break;
            case 40: // down arrow
                if (direction.y !== -1) direction = { x: 0, y: 1 };
                break;
        }
    });

    // Start the game
    $('#startGame').click(function () {
        const selectedLevel = $('#level').val();
        setLevel(selectedLevel);
        
        clearInterval(gameInterval);
        snake = [{ x: 1, y: 1 }];
        direction = { x: 1, y: 0 };
        gameInterval = setInterval(moveSnake, gameSpeed);
    });

    // Function to reset the game
    function resetGame() {
        snake = [{ x: 1, y: 1 }];
        food = { x: Math.floor(Math.random() * boardSize) + 1, y: Math.floor(Math.random() * boardSize) + 1 };
        direction = { x: 1, y: 0 };
        drawSnake();
    }

    resetGame();  // Initialize the game board
});
