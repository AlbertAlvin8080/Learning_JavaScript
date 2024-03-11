"use strict";

const btn_start = document.querySelector('#start');
const btn_stop = document.querySelector('#stop');
const btn_size_up = document.querySelector('#size-up');
const btn_size_down = document.querySelector('#size-down');
const box = document.querySelector('.box');
const palco = document.querySelector('.palco');

// init
(function () {
    box.style = 'width: 50px; height: 50px; position: relative; left: 0px; top:0px; border-radius: 50%;';
})();

let dirX = 1;
let dirY = 1;
let my_interval = null;
let palco_width = palco.offsetWidth - parseInt(box.style.width);
let palco_height = palco.offsetHeight - parseInt(box.style.height);

function set_palco_sizes() {
    palco_width = palco.offsetWidth - parseInt(box.style.width);
    palco_height = palco.offsetHeight - parseInt(box.style.height);
}

window.addEventListener('resize', () => {
    set_palco_sizes();
});

function border_colision(left, top, increase) {
    if(left + increase >= palco_width) {
        dirX = -1;
    } else if(left <= 0) {
        dirX = 1;
    }

    if(top + increase >= palco_height) {
        dirY = -1;
    } else if(top <= 0) {
        dirY = 1;
    }
}

function move() {
    let left = parseInt(box.style.left);
    let top = parseInt(box.style.top);

    let increase = 10;
    border_colision(left, top, increase);

    box.style.left = `${left + increase * dirX}px`;
    box.style.top = `${top + increase * dirY}px`;
}

btn_start.addEventListener('click', () => {
    clearInterval(my_interval);
    my_interval = setInterval(move, 20);
});

btn_stop.addEventListener('click', () => clearInterval(my_interval));

btn_size_up.addEventListener('click', () => {
    box.style.width = `${parseInt(box.style.width) + 10}px`;
    box.style.height = `${parseInt(box.style.height) + 10}px`;
    set_palco_sizes();
});

btn_size_down.addEventListener('click', () => {
    box.style.width = `${parseInt(box.style.width) - 10}px`;
    box.style.height = `${parseInt(box.style.height) - 10}px`;
    set_palco_sizes();
});