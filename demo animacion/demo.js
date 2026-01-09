/*
ATENCION:
No intentes entender el código, llevo con esto aprox. 4h y el cerebro no me da para más.
Si quieres hacerte una ídea de lo que he hecho mira el siguiente link: https://lenguajejs.com/javascript/canvas/imagenes/
*/

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false;

const sprite = document.getElementById('sprite')

let running = false;
const frameSize = 25;
let x = 0, y = 0;
let frame = 0
const TOTAL_FRAMES = 4
const FRAME_MAX_DELAY = 6;
let delay = 0
let vel = 0

function update(){
    delay++;
    if (x < 950){x = x + 3}
    else{
        running = false;
        frame = 0
        sprite.src = './sprites/Sprite-0001.png'
        draw()
    }
    if (delay >= FRAME_MAX_DELAY){
        frame = (frame + 1) % TOTAL_FRAMES;
        delay = 0
    }
}

function draw(){
    const frame_x = frame * frameSize;
    const finalSize = frameSize * 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, 
    frame_x, 0, 
    frameSize, frameSize, 
    x, y, 
    finalSize, finalSize)
}

function animLoop(){
    if (!running) return;
    draw();
    update();
    requestAnimationFrame(animLoop);
}

function mover(){
    running = true;
    animLoop();
}

ctx.drawImage(sprite, 0, 0, 50, 50)

document.addEventListener('keydown', function(e){
    if (event.code === 'Enter'){
        sprite.src = './sprites/Sprite-sheet2.png'
        mover()
    }
})