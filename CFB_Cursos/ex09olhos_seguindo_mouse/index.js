"use strict";

const container = document.querySelector('.container');
const olho1 = document.querySelector('#olho1');
const olho2 = document.querySelector('#olho2');

window.addEventListener('mousemove', (event)=>{
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const rect = container.getBoundingClientRect();
    const containerX = rect.width / 2;
    const containerY = rect.height / 2; // pegando o centro do container (em coordenadas)
    // const containerX = rect.left + rect.width / 2; // era pra ser assim
    // const containerY = rect.top + rect.height / 2; 

    const angle = angleNormalize(mouseX, containerX, mouseY, containerY);

    olho1.style.transform = 'rotate(' + angle + 'deg)';
    olho2.style.transform = 'rotate(' + angle + 'deg)';
});

function angleNormalize(x1, x2, y1, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return deg;
}