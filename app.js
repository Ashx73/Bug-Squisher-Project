// VARIABLES
let bugs = [];
let splats = [];
let score = 0 ;
let timer = 30;
let timeId = null;
let gameInterval;
let bugspeed = 2;



//CACHED ELEMENTS
const openHowToPlayButtonEl = document.querySelector('#open-how-to-play')
const instructionsModalEl = document.querySelector('#instructions')
const closeHowToPlayButtonEl = document.querySelector('#close-how-to-play')

const openLevelsEl = document.querySelector('#open-levels')
const diffuceltyModalEl = document.querySelector('#diffucelty')
const closeLevelsEl = document.querySelector('#close-levels')

const startButtonEl = document.querySelector('#start')
const gameBoardEl = document.querySelector('#game-board')
const buttonsEl = document.querySelector('.buttons')
const titleEl = document.querySelector('h1')
const homeEl = document.querySelector('#home')

const scoreEl = document.querySelector('#score');
const timerEl = document.querySelector('#timer');

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

const messageEl = document.querySelector('#message')
const playAgainEl =document.querySelector('#play-again')

//FUNCTIONS

function Bug() {
    const fromLeft = Math.random() < 0.5;
    if (fromLeft) {
        this.x = -9;                 
        this.angle = Math.PI / 2;     
    } else {
        this.x = canvas.width + 9;    
        this.angle = -Math.PI / 2;     
    }

    this.y = Math.random() * (canvas.height - 40) + 20;
    this.width = 30;
    this.height = 30;
    this.speed = bugspeed;
    this.moveAngle = 0;

    this.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); 
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🐞",0,0)
        ctx.restore();
    };
    this.move = function() {
        if (Math.random() < 0.05) {
            this.moveAngle = (Math.random() - 0.5) * 6;
        }
        this.angle += (this.moveAngle * Math.PI) / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    };
    this.ifOffScreen = function () {
        return (
            this.x < -10 ||
            this.x > canvas.width + 10 ||
            this.y < -10||
            this.y > canvas.height + 10
        );
    };
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    for (let i = splats.length - 1; i >= 0; i--) {
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("💥", splats[i].x, splats[i].y);
        
        splats[i].timer = splats[i].timer -1;
        if (splats[i].timer <= 0) {
            splats.splice(i, 1);
       }
    }
    
    if (bugs.length < 15 && Math.random () < 0.02) {
        bugs.push(new Bug())
    }
    for (let i=bugs.length - 1; i>=0; i--) {
        bugs[i].move();
        bugs[i].draw();
    
        if (bugs[i].ifOffScreen()) {
            bugs.splice(i,1)
        }
    }
}

const squishSound = new Audio('./assets/squish.mp3')
squishSound.volume = 0.5


const updateTimer = () => {
    timer = timer - 1
    timerEl.textContent = `${timer}`
    if (timer === 0) {
        clearInterval(timeId)
        endGame()
    }
}

function endGame() {
    if (score === 15 && timer > 0) {
        messageEl.textContent = `YOU WIN!`
        messageEl.style.color ='#b4d3c0';
        messageEl.style.display = 'inline-block';
        bugs=[];
        splats=[];
        clearInterval(gameInterval);
        clearInterval(timeId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else if (timer === 0 && score < 15){
        messageEl.textContent = `Game Over`
        messageEl.style.color = '#b92348';
        messageEl.style.display = 'block';
        bugs=[];
        splats=[];
        clearInterval(gameInterval);
        clearInterval(timeId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

//EVENT LISTENER 
openHowToPlayButtonEl.addEventListener('click', ()=>{
    instructionsModalEl.showModal()
})
closeHowToPlayButtonEl.addEventListener('click', ()=>{
    instructionsModalEl.close()
})

openLevelsEl.addEventListener('click', ()=>{
    diffuceltyModalEl.showModal()
})
closeLevelsEl.addEventListener('click', ()=>{
diffuceltyModalEl.close()
})

diffuceltyModalEl.addEventListener('click', (event) => {
    if (event.target.id === 'easy') {
        bugspeed = 2;
        diffuceltyModalEl.close();
    } else if (event.target.id === 'medium') {
        bugspeed = 4;
        diffuceltyModalEl.close();
    } else if (event.target.id === 'hard') {
        bugspeed = 6;
        diffuceltyModalEl.close();
    }
});
            
startButtonEl.addEventListener('click', () => {
    titleEl.style.display = 'none';            
    buttonsEl.style.display = 'none';
    homeEl.style.display = 'inline-block';
    playAgainEl.style.display = 'inline-block';
    gameBoardEl.style.display = 'block';  
    
    bugs = [];
    splats=[];
    score = 0;
    timer = 30;
    scoreEl.textContent = `${score}`;
    timerEl.textContent = `${timer}`;
    messageEl.style.display = 'none';

    clearInterval(gameInterval);
    clearInterval(timeId);
    gameInterval = setInterval(gameLoop, 20);
    timeId = setInterval(updateTimer, 1000)
});

homeEl.addEventListener('click', () => {
    titleEl.style.display = 'block';            
    buttonsEl.style.display = 'block';
    homeEl.style.display = 'none';
    playAgainEl.style.display = 'none'
    gameBoardEl.style.display = 'none';
    messageEl.style.display = 'none';
    
    clearInterval(gameInterval);
    clearInterval(timeId);
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (let i = bugs.length - 1; i >= 0; i--) {
        const distanceX = mouseX - bugs[i].x;
        const distanceY = mouseY - bugs[i].y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 25) {
            squishSound.play()
            splats.push({x: bugs[i].x ,y: bugs[i].y, timer: 15})
            bugs.splice(i, 1); 
            score++;           
            scoreEl.textContent = `${score}`                        
            endGame();
            break;
        }
    }
    
})

playAgainEl.addEventListener('click', () => {
    titleEl.style.display = 'none';            
    buttonsEl.style.display = 'none';
    homeEl.style.display = 'inline-block';
    playAgainEl.style.display = 'inline-block';
    gameBoardEl.style.display = 'block';  
    
    bugs = [];
    splats=[];
    score = 0;
    timer = 30;
    scoreEl.textContent = `${score}`;
    timerEl.textContent = `${timer}`;
    messageEl.style.display = 'none';

    clearInterval(gameInterval);
    clearInterval(timeId);
    gameInterval = setInterval(gameLoop, 20);
    timeId = setInterval(updateTimer, 1000)
});