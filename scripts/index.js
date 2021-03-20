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
const secondModal = document.querySelector('.modal__content--two');
const hmenu = document.querySelector('.header__items');
const nav = document.querySelector('.navigator');

// -------------------------------------
// H_MENU
// -------------------------------------
let showed = false;

console.log(nav);

function handleHmenu() {


    if (!showed) {
        nav.style.display = 'block';
        showed = true;
    } else {
        nav.style.display = 'none';
        showed = false;
    }


}

hmenu.addEventListener('click', handleHmenu);



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
const buttonsModal = document.querySelectorAll('.button--open--modal');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const modalTitle = document.querySelector('.modal__text--title');
const closeButton = document.querySelector('.image__close');

let options = ['right', 'left', 'jump', 'shoot'];

function random(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }


function handleOpenModal() {
    if (open) {
        open = false;
        console.log('OpenModal');
        document.body.style.overflow = 'hidden';
        modal.style.display = 'block';
        modalTextAnim();
        setTimeout(handleModalAppear, 15);

    }
}

function handleModalAppear() {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translate(0px, 0px)';
    setTimeout(startGame, 500);

}

function startGame() {
    let index = random(0, 3);
    if (finish == true) {
        posModal(options[index]);
        current = options[index];
    }

}



buttonsModal.forEach(function(value, index) {
    value.addEventListener('click', handleOpenModal);
});

closeButton.addEventListener('click', handleCloseModal);

let opacity = true;
let refreshIntervalId;

function handleCloseModal() {
    open = true;
    clearInterval(refreshIntervalId);
    clearInterval(refreshIntervalId1);
    handleLeave();
    modal.style.opacity = 0;
    modalContent.style.transform = 'translate(0px, -500px)';
    document.body.style.overflow = 'hidden scroll';
    document.body.style.overflowX = 'hidden';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);
}

function modalTextAnim() {
    console.log('Anim!');
    refreshIntervalId = setInterval(changeOpacity, 800);
    refreshIntervalId1 = setInterval(changeOpacityAnim, 200);
}

function changeOpacity() {
    if (opacity) {
        modalTitle.style.opacity = 0;
        opacity = false;
    } else {
        modalTitle.style.opacity = 1;
        opacity = true;
    }
}

// -------------------------------------
// INTERACTION
// -------------------------------------
let refreshIntervalId1;
let finish = true;
let current;


function changeOpacityAnim() {
    if (opacity) {
        animText.style.opacity = 0;
        opacity = false;
    } else {
        animText.style.opacity = 1;
        opacity = true;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (current === 'left') {
            console.log("L")
            handleLeave();
            setTimeout(startGame, 300);
        }
    } else if (event.keyCode == 39 || event.keyCode == 68) {
        if (current === 'right') {
            console.log("R")
            handleLeave();
            setTimeout(startGame, 300);
        }
    } else if (event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
        if (current === 'jump') {
            console.log("J")
            handleLeave();
            setTimeout(startGame, 300);
        }
    } else if (event.keyCode == 13) {
        if (current === 'shoot') {
            console.log("S")
            shootLeave();
            setTimeout(startGame, 300);
        }
    }
});


function setInitialPos() {

    secondModal.style.opacity = '0';
    secondModal.style.transition = 'transform .001s ease';
    secondModal.style.transform = `translate(${posIx}px, ${posIy}px)`;
    setTimeout(handleInteractionEvent, 500);
}

function handleInteractionEvent() {

    secondModal.style.transition = 'transform .25s ease';
    secondModal.style.opacity = '1';
    secondModal.style.transform = 'translate(0px, 0px)';
}

function handleLeave() {
    secondModal.style.transform = `translate(${posFx}px, ${posFy}px)`;
    setTimeout(
        () => {
            finish = true;
        }, 100
    );
}


let posFx;
let posFy;
let posIx;
let posIy;
const animText = document.querySelector('.modal__text--anim');
var open = true;

function posModal(pos) {

    finish = false;
    switch (pos) {
        case 'right':

            posIx = -1000;
            posIy = 0;
            posFx = 1000;
            posFy = 0;
            animText.innerHTML = 'Move Right!';

            setTimeout(setInitialPos, 3);


            break;

        case 'left':


            posIx = 1000;
            posIy = 0;
            posFx = -1000;
            posFy = 0;
            animText.innerHTML = 'Move Left!';
            setTimeout(setInitialPos, 10);
            break;

        case 'jump':
            posIx = 0;
            posIy = 1000;
            posFx = 0;
            posFy = 1000;
            animText.innerHTML = 'Jump!';
            setTimeout(setInitialPos, 10);
            break;

        case 'shoot':
            posIx = 0;
            posIy = 0;
            posFx = 0;
            posFy = 0;
            animText.innerHTML = 'Shoot!';
            shoot();
            break;
    }

}

function shoot() {
    secondModal.style.opacity = '0';
    secondModal.style.transition = 'transform .001s ease';
    secondModal.style.transform = `translate(${posIx}px, ${posIy}px)`;
    setTimeout(appearShoot, 10);
}

function appearShoot() {
    secondModal.style.transition = 'opacity 0.4s ease-in-out';
    secondModal.style.opacity = '1';
}

function shootLeave() {
    secondModal.style.opacity = '0';
    setTimeout(
        () => {
            finish = true;
        }, 100
    );
}