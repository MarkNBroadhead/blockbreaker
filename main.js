let canvas = getCanvas(800, 600);
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext('2d');
var lastrender = 0
var paddleWidth = 200
var paddleHeight = 30
var blockWidth = 100
var blockHeight = 40

requestAnimationFrame(loop)
addEventListener("keydown", keydown, false)
addEventListener("keyup", keyup, false)

var state = {
    blocks: [],
    paddleX: width / 2 - paddleWidth / 2,
    paddleY: height - paddleHeight,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
}
addBlocks()

function block(x, y, color) {
    this.x = x
    this.y = y
    if (color) {
        this.color = color
    } else {
        this.color = "#" + (Math.random() * 16777215).toString(16)
    }
    this.draw = function () {
        ctx.beginPath()
        ctx.rect(x, y, blockWidth, blockHeight)
        ctx.fillStyle = color
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}

var keyMap = {
    'KeyD': 'right',
    'KeyA': 'left',
    'KeyW': 'up',
    'KeyS': 'down',
    'ArrowRight': 'right',
    'ArrowLeft': 'left',
    'ArrowUp': 'up',
    'ArrowDown': 'down'
}

function keydown(event) {
    state.pressedKeys[keyMap[event.code]] = true
}

function keyup(event) {
    state.pressedKeys[keyMap[event.code]] = false
}

function update(progress) {
    if (state.pressedKeys.left) {
        state.paddleX -= progress
    }
    if (state.pressedKeys.right) {
        state.paddleX += progress
    }
    if (state.paddleX > width - paddleWidth) {
        state.paddleX = width - paddleWidth
    }
    if (state.paddleX < 0) {
        state.paddleX = 0
    }
}

function addBlocks() {
    var colors = ['blue', 'red', 'yellow']
    console.log("colors number: " + colors.length)
    for (var i = 1; i < canvas.width / blockWidth; i++) {
        let nextColor = colors[parseInt(Math.random() * (colors.length))]
        // state.blocks.push({ x: i * 100, y: 100, color: nextColor })
        state.blocks.push(new block(i*100, 100, nextColor))
    }
}

function draw() {
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(state.paddleX, state.paddleY, paddleWidth, paddleHeight)
    console.log("state: " + JSON.stringify(state.blocks))
    state.blocks.forEach(x => x.draw())
};

function loop(timestamp) {
    var progress = timestamp - lastrender
    update(progress)
    draw()

    lastrender = timestamp
    requestAnimationFrame(loop)
}

function getCanvas(width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let currentDiv = document.getElementById('canvasDiv');
    currentDiv.appendChild(canvas);
    return canvas;
}
