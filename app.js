let moveSpeed = 3;
let gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

// recall: this method is to get details about the rect/area around the bird image
let bird_props = bird.getBoundingClientRect();


let background = document.querySelector('.background').getBoundingClientRect();
let scoreVal = document.querySelector('.scoreVal');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.scoreTitle');

// something to determine if the game is playing or ready to start
let gameState = 'Start';

// at the start of the game, the bird won't show
img.style.display = 'none';
message.classList.add('messageStyle');

// how to actually start the game, with a key pressed down and what state the game is in
document.addEventListener('keydown', (e) => {
    // how to set a specific key AND if the game isn't already playing yet
    if(e.key == "Enter" && gameState != 'Play') {

        // it's in the CSS
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        // when the game is playing, the bird will have a block area around it (which will determine if we hit a pipe anywhere)
        img.style.display = 'block';
        bird.style.top = '40vh';

        // set the game condition to play
        gameState = 'Play';
        message.innerHTML = '';

        // setting the scoreboard
        scoreTitle.innerHTML = "Score : ";
        scoreVal.innerHTML = '0';
        message.classList.remove('messageStyle');

        // start the game with this function
        play();
    }
});

// how does the game function?
function play() {

    // how to operate the bird
    function move() {

        if(gameState != 'Play') {
            return;
        };
        
        
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');

        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0) {
                element.remove();
            }
            else {
                if(
                    bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && 
                    bird_props.left + bird_props.width > pipe_sprite_props.left && 
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && 
                    bird_props.top + bird_props.height > pipe_sprite_props.top) {
                        gameState = 'End';
                        message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter to Restart';
                        message.classList.add('messageStyle');
                        img.style.display = 'none';
                        return;
                    }
                else {
                    if(
                        pipe_sprite_props.right < bird_props.left && 
                        pipe_sprite_props.right + moveSpeed >= bird_props.left && 
                        element.increase_score == '1') {
                            scoreVal.innerHTML =+ scoreVal.innerHTML + 1;
                        };

                    element.style.left = pipe_sprite_props.left - moveSpeed + 'px';
                    
                }
            }
        });
        requestAnimationFrame(move);
    };

    requestAnimationFrame(move);

    let bird_dy = 0;
    function applyGravity() {
        if(gameState != 'Play') {
            return;
        };
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'https://thumbs.gfycat.com/FlimsyPlasticEkaltadeta-max-1mb.gif';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'https://thumbs.gfycat.com/FlimsyPlasticEkaltadeta-max-1mb.gif';
            }
        });
        
        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            gameState = 'End';
            message.style.left = '28vm';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let pipe_separation = 0;
    let pipeGap = 35;

    function createPipe() {
        if(gameState != 'Play') {
            return;
        };

        if(pipe_separation > 115) {
            pipe_separation = 0;
            let pipePosi = Math.floor(Math.random() * 43) + 8;
            let pipeSpriteInv = document.createElement('div');
            pipeSpriteInv.className = 'pipe_sprite';
            pipeSpriteInv.style.top = pipePosi - 70 + 'vh';
            pipeSpriteInv.style.left = '100vw';

            document.body.appendChild(pipeSpriteInv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipePosi + pipeGap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }

        pipe_separation++;
        requestAnimationFrame(createPipe);

    }
    requestAnimationFrame(createPipe);
}