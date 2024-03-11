"use strict";

const btn_stop = document.querySelector('#stop');
const btn_left = document.querySelector('#left');
const btn_right = document.querySelector('#right');
const box = document.querySelector('.box');

// init
(function() {
    box.style = 'width: 100px; height: 40px; position: relative; left: 0px';
})();

let myInterval = null;
let window_width = window.innerWidth;

function move(direction) {
    const left = parseInt(box.style.left);
    if(left >= window_width - parseInt(box.style.width) && direction === 1) {
        clearInterval(myInterval);
        return;
    } 
    if(left < 0 && direction === -1) {
        clearInterval(myInterval);
        return;
    }
    box.style.left = `${left + (10*direction)}px`
}

btn_right.addEventListener('click', ()=>{
    clearInterval(myInterval);
    myInterval = setInterval(move, 20, 1);
});

btn_left.addEventListener('click', ()=>{
    clearInterval(myInterval);
    myInterval = setInterval(move, 20, -1);
});

btn_stop.addEventListener('click', ()=>{
    clearInterval(myInterval);
});

window.addEventListener('resize', ()=>{
    window_width = window.innerWidth;
});