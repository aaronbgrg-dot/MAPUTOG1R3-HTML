// Variables relacionadas con el canvas/html
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const error_msg = document.getElementById('reset_error')
ctx.imageSmoothingEnabled = false;

// Variable que define el sprite
const sprite = document.getElementById('sprite')

// Variables que contienen las propiedades del sprite y de la animación
let running = true;
let enterPressed = true
let pPressed = false
let delay = 0
let vel = 0
let x = 0, y = 0;
let frame = 0
const frameSize = 48;
const TOTAL_FRAMES = 18
const FRAME_MAX_DELAY = 4;

// Función que actualiza los frames de la animación
function update(){
    delay++;
    if (delay >= FRAME_MAX_DELAY){
        frame = (frame + 1) % TOTAL_FRAMES;
        delay = 0
    }
}

// Función que dibuja en pantalla cada frame
function draw(){
    const frame_x = frame * frameSize;
    const finalSize = frameSize * 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, 
    frame_x, 0, 
    frameSize, frameSize, 
    x, y, 
    finalSize, finalSize)
}

// Loop de la animación
function animLoop(){
    if(!running) return
    draw();
    update();
    requestAnimationFrame(animLoop);
}

animLoop()

// EventListener que controla el estado de la animación (reproduciendo, pausado, reseteado) 
document.addEventListener('keydown', function(e){
    // Al presionar Enter se reproduce
    if (event.code === 'Enter'){
        if (enterPressed === false){
            running = true
            animLoop()
        }
        enterPressed = true
        pPressed = false
    }
    // Al presionar P se pausa
    if (event.code === 'KeyP'){
        if (pPressed === false){
        running = false
        draw()
        }
        pPressed = true
        enterPressed = false
    }
    // Al pulsar R se resetea (tiene que estar en estado "pausado" para poder resetear)
    if (event.code === 'KeyR'){
        if (pPressed === true){
            frame = 0
            draw()
            enterPressed = false
            pPressed = false
            error_msg.innerHTML = ''
        }
        else{
            error_msg.innerHTML = 'Pausa la animación antes de resetear'
        }
    }
})