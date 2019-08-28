//Ở đây ta tạo ra bộ khung chứa game
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var row = 400;
var column = 400;
var grid = 16;

// khởi tạo đối tượng rắn
var snake = {
    x: 160, //vị trí của snake theo hướng x,y
    y: 160,
    dx: grid, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
    //snake sẽ di chuyển theo x direction với value = 16
    dy: 0,
    cells: [],
    maxCells: 4
};

var food = {
    x: 320,
    y: 320
};
var point = 0;
var count = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    //hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong
    requestAnimationFrame(loop);
    // slow game loop to 15 fps instead of 60 - 60/15 = 4
    if (++count < 4) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0, 0, 400, 400);
    context.stroke();
    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị
    snake.y += snake.dy;
    // game over khi rắn đụng tường
    if (snake.x < 0 || snake.x >= row || snake.y < 0 || snake.y >= column) {
        overGame();
    }

    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    // draw food
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    // draw snake
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // snake ăn food
        if (cell.x === food.x && cell.y === food.y) {
            snake.maxCells++;
            point = snake.maxCells - 4;
            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;
        }
        // check va chạm khi rắn đụng đuôi
        for (var i = index + 1; i < snake.cells.length; i++) {
            // va chạm thì reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                overGame();
            }
        }
    });
    // vẽ điểm
    context.fillStyle = 'black'
    context.font = "30px Arial";
    context.fillText('Point: ' + point, 30, 450);
    //reset game
    function overGame() {
        alert("GAME OVER");
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
        point = 0;
    }
}

//bắt sự kiện bàn phím ấn xuống
document.addEventListener('keydown', function (e) {
    // lọc sự kiện keydown để rắn không di ngược lại
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
requestAnimationFrame(loop);