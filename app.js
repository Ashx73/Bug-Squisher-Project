// VARIABLES
let bugs = []
let score = 0 
let timer = 30


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

//FUNCTIONS



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


// startButtonEl.addEventListener('click', ()=>{
//     buttonsEl.style.display = 'none';
//     titleEl.style.display = 'none';
//     gameBoardEl.style.display = 'block'
// })

startButtonEl.addEventListener('click', () => {
    titleEl.style.display = 'none';            
    buttonsEl.style.display = 'none';
    homeEl.style.display = 'block';
    gameBoardEl.style.display = 'block';            
});

homeEl.addEventListener('click', () => {
    titleEl.style.display = 'block';            
    buttonsEl.style.display = 'block';
    homeEl.style.display = 'none';
    gameBoardEl.style.display = 'none';            
    
});