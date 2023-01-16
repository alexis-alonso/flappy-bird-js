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

        // don't do rest of function if game isn't even playing yet (so don't move the bird)
        if(gameState != 'Play') {
            return;
        };
        
        // recall that querySelectorAll (which is a DOM API btw) returns a nodeList (which is basically like an array, kinda)...
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');

        // for each pipe that gets created... (we can use an array method on querySelectorAll here and the forEach method is an array method, which takes a callback function)
        pipe_sprite.forEach((element) => {

            // we're going to set the variable to host the properties of the surrounding area of the pipe
            let pipe_sprite_props = element.getBoundingClientRect();

            // same goes for the bird's surrounding area
            bird_props = bird.getBoundingClientRect();

            // if the distance between right side of the pipe's rectangle and the viewport's top left corner is <=0 (like when it starts to go off screen to the left)...
            if(pipe_sprite_props.right <= 0) {

                // remove the pipe (naturally)
                element.remove();
            }

            else {

                // how to stop the game
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
                
                // how to keep the game going if it hasn't stopped already by the top condition
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

        // 
        requestAnimationFrame(move);
    };

    requestAnimationFrame(move);

    // how to set the bird's initial position?
    let bird_dy = 0;

    // how to set the gravity (how fast the bird falls?)
    function applyGravity() {

        // again, none of the stuff below applies if the game hasn't started yet
        if(gameState != 'Play') {
            return;
        };

        // take the bird's current position and gravity value to it
        bird_dy = bird_dy + gravity;

        // when a key is pressed
        document.addEventListener('keydown', (e) => {

            // in particular, when the Arrow Up key OR the space bar is pressed
            if(e.key == 'ArrowUp' || e.key == ' ') {

                // this is like setting the flapping image (because the initial image is normal bird, key pressed is the bird flapping its wings)
                img.src = 'https://thumbs.gfycat.com/FlimsyPlasticEkaltadeta-max-1mb.gif';

                // make the bird flap higher (-8 is an ok value, >=-8 will make it harder, <-8 makes it easier)
                bird_dy = -8;
            }
        });

        // when a key is released
        document.addEventListener('keyup', (e) => {

            // in particular, when the Arrow Up key OR the space bar is released
            if(e.key == 'ArrowUp' || e.key == ' ') {

                // return to the non-flapping image
                img.src = 'https://thumbs.gfycat.com/FlimsyPlasticEkaltadeta-max-1mb.gif';
            }
        });
        
        // if the bird touches the top of the viewport OR the bottom
        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom) {

            // game over
            gameState = 'End';

            // game over message and reload the page
            message.style.left = '28vm';
            window.location.reload();
            message.classList.remove('messageStyle');

            // quit the entire play()
            return;
        }

        //  make the top of the bird be the same as its position + its surrounding area's top ?
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    // side to side apart
    let pipe_separation = 0;

    // top to bottom apart?
    let pipeGap = 30;

    // how to make the pipes
    function createPipe() {

        // goes w/o saying
        if(gameState != 'Play') {
            return;
        };

        // if this value is bigger than 115...
        if(pipe_separation > 115) {

            // set it back to 0
            pipe_separation = 0;

            // let this new var be a random number
            let pipe_Position = Math.floor(Math.random() * 43) + 8;

            // make a new div in the DOM (we're going to make the new pipes at even intervals)
            let pipeSpriteInv = document.createElement('div');

            // makes a new pipe (using HTML class)
            pipeSpriteInv.className = 'pipe_sprite';

            // take that random value from earlier do the math, apply this as a height value to the top of the pipe (also determines how close top pipe is to bottom)
            pipeSpriteInv.style.top = pipe_Position - 70 + 'vh';

            // start the left side of the pipe at the end of the viewport
            pipeSpriteInv.style.left = '100vw';

            // add this whole div to the end of the body
            document.body.appendChild(pipeSpriteInv);

            // make another pipe (using HTML class)
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';

            // set the bottom pipe's top to be this equation
            pipe_sprite.style.top = pipe_Position + pipeGap + 'vh';

            // start the left side of the pipe at the end of the viewport (again)
            pipe_sprite.style.left = '100vw';

            // set [a new property] to this value
            pipe_sprite.increase_score = '1';

            // add this whole div to the end of the body
            document.body.appendChild(pipe_sprite);
        }

        // this incrementing value determines how close the pipes are side to side (smaller is easier, bigger is impossible)
        pipe_separation+=1;
        requestAnimationFrame(createPipe);

    }
    requestAnimationFrame(createPipe);
}



