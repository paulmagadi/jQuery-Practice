// script.js
$(document).ready(function () {
    let snake = [{ x: 1, y: 1 }];
    let food = { x: 10, y: 10 };
    let direction = { x: 1, y: 0 }; // Move right initially
    const boardSize = 20;

    // Function to draw the snake
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

        // Draw the food
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

        // Check if snake eats the food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food position
            food = {
                x: Math.floor(Math.random() * boardSize) + 1,
                y: Math.floor(Math.random() * boardSize) + 1,
            };
        } else {
            snake.pop(); // Remove the tail if not eating food
        }

        // Check for collision with walls
        if (head.x < 1 || head.y < 1 || head.x > boardSize || head.y > boardSize) {
            alert('Game Over!');
            snake = [{ x: 1, y: 1 }];
            direction = { x: 1, y: 0 };
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

    // Start the game loop
    setInterval(moveSnake, 200);
});
