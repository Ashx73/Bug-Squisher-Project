// VARIABLES
let bugs = []
let score = 0 
let timer = 30
let gameInterval;


//CACHED ELEMENTS
const openHowToPlayButtonEl = document.querySelector('#open-how-to-play')
const instructionsModalEl = document.querySelector('#instructions')
const closeHowToPlayButtonEl = document.querySelector('#close-how-to-play')

const openLevelsEl = document.querySelector('#open-levels')
const diffuceltyModalEl = document.querySelector('#diffucelty')
const closeLevelsEl = document.querySelector('#close-levels')

const easyButtonEl = document.querySelector('#easy')
const mediumButtonEl = document.querySelector('#medium')
const hardButtonEl = document.querySelector('#hard')

const startButtonEl = document.querySelector('#start')
const gameBoardEl = document.querySelector('#game-board')
const buttonsEl = document.querySelector('.buttons')
const titleEl = document.querySelector('h1')
const homeEl = document.querySelector('#home')

const scoreEl = document.querySelector('#score');
const timerEl = document.querySelector('#timer');

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

//FUNCTIONS

function Bug() {
    const fromLeft = Math.random() < 0.5;
    if (fromLeft) {
        this.x = -15;                 
        this.angle = Math.PI / 2;     
    } else {
        this.x = canvas.width + 15;    
        this.angle = -Math.PI / 2;     
    }

    this.y = Math.random() * (canvas.height - 60) + 30;
    this.width = 30;
    this.height = 30;
    this.speed = 2;
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
}
const testBug = new Bug();

    function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    testBug.move();
    testBug.draw();
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

// easyButtonEl.addEventListener('click', ()=>{
// })
// mediumButtonEl.addEventListener('click', ()=>{ 
// })
// hardButtonEl.addEventListener('click', ()=>{  
// })
            
            
    
startButtonEl.addEventListener('click', () => {
    titleEl.style.display = 'none';            
    buttonsEl.style.display = 'none';
    homeEl.style.display = 'block';
    gameBoardEl.style.display = 'block';  
    
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 20);
});

homeEl.addEventListener('click', () => {
    titleEl.style.display = 'block';            
    buttonsEl.style.display = 'block';
    homeEl.style.display = 'none';
    gameBoardEl.style.display = 'none';
    
    clearInterval(gameInterval)
});