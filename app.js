let moveSpeed = 3;
let gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let birdProps = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let scoreVal = document.querySelector('.scoreVal');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.scoreTitle');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    if(e.key == "Enter" && gameState != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        gameState = 'Play';
        message.innerHTML = '';
        scoreTitle.innerHTML = "Score : ";
        scoreVal.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play() {
    function move() {
        if(gameState != 'Play') {
            return;
        };

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();
        })
    }
}