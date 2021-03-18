/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @author Nicolás Penagos Montoya
 * nicolas.penagosm98@gmail.com
 **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

// -------------------------------------
// REFERENCES
// -------------------------------------
const buttons = document.querySelectorAll('.button');
const slider = document.querySelector('.carrousel__slider');
const forwardBtn = document.querySelector('.image__slider--forward');
const backBtn = document.querySelector('.image__slider--back');
const cards = document.querySelectorAll('.carrousel__card');


// -------------------------------------
// LINKS 
// -------------------------------------
let linksMap = new Map();
linksMap.set(1, 'https://na.leagueoflegends.com/es-mx/');
linksMap.set(2, 'https://teamfighttactics.leagueoflegends.com/es-mx/');
linksMap.set(3, 'https://playruneterra.com/en-us/');
linksMap.set(4, 'https://playvalorant.com');
linksMap.set(5, 'http://www.cupheadgame.com');

buttons.forEach(function(value, index) {


    function handleButtonClick() {
        console.log(index);
        console.log(linksMap.get(index));
        window.open(linksMap.get(index));
    }
    value.addEventListener('click', handleButtonClick);




});


// -------------------------------------
// SLIDER
// -------------------------------------
let counter = 0;
let keep = false;
let direction = 0;
let speedFactor = 1;
let speedCounter = 0;
let speed = 40;
const card = cards[cards.length - 1];
var posicion = card.getBoundingClientRect();

backBtn.onmousedown = function() {
    keep = true;
    direction = -1;
    moveCarrousel();
    speed = 40;
}

backBtn.onmouseup = function() {
    keep = false;
}

forwardBtn.onmousedown = function() {
    keep = true;
    direction = 1;
    moveCarrousel(1);
    speed = 40;
}

forwardBtn.onmouseup = function() {
    keep = false;
}

function moveCarrousel(direction) {

    updateCounter();
    moveSlider(direction);
    speedCounter++;
    if (speedCounter % 2 === 0) {
        if (speed > 4) {
            speed = speed - 2;
        }
    }

    if (keep)
        setTimeout(moveCarrousel, speed);
}

function updateCounter() {
    posicion = card.getBoundingClientRect();
    if (direction === 1) {
        if (windowSize()[0] - 60 < posicion.right)
            counter++;
    } else {
        if (counter > 0)
            counter--;
    }
}

function moveSlider() {

    slider.style.transform = `translate(-${(counter*10)}px, 0px)`;
}


// -------------------------------------
// UTILS
// -------------------------------------
function windowSize() {
    var size = [0, 0];
    if (typeof window.innerWidth != 'undefined') {
        size = [window.innerWidth, window.innerHeight];
    } else if (typeof document.documentElement != 'undefined' &&
        typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        size = [
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        ];
    } else {
        size = [
            document.getElementsByTagName('body')[0].clientWidth,
            document.getElementsByTagName('body')[0].clientHeight
        ];
    }
    return size;
}

// -------------------------------------
// MODAL
// -------------------------------------
const modalButton = document.querySelector('.button--open--modal');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');

function handleOpenModal() {
    document.body.style.overflow = 'hidden';
    modal.style.display = 'block';
    setTimeout(handleModalAppear, 15);



}

function handleModalAppear() {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translate(0px, 0px)';
}

modalButton.addEventListener('click', handleOpenModal);