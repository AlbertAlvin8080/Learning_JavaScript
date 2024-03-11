"use strict";

const palco = document.querySelector('.palco');
const qtd_objetos = document.getElementById('iqtd-objetos');
const p_numero_objetos = document.querySelector('#numero-objetos');
const btn_add = document.querySelector('#add');
const btn_rm = document.getElementById('rm');

let largura_palco = palco.offsetWidth;
let altura_palco = palco.offsetHeight;
let numero_de_bolas = 0;
let array_bolas = [];
let id = 0;

window.addEventListener('resize', ()=>{
    largura_palco = palco.offsetWidth;
    altura_palco = palco.offsetHeight;
});

btn_add.addEventListener('click', ()=>{
    const qtde = qtd_objetos.value;
    for(let i = 0; i < qtde; ++i) {
        array_bolas.push(new Ball(palco));
    }
    p_numero_objetos.innerText = array_bolas.length;
});

btn_rm.addEventListener('click', ()=>{
    const initial_lenght = array_bolas.length
    for(let i = 0; i < initial_lenght; ++i) {
        array_bolas.pop().remover();
    }
    id = 0;
});

class Ball {
    constructor(palco) {
        this.r = Math.floor(Math.random()*256);
        this.g = Math.floor(Math.random()*256);
        this.b = Math.floor(Math.random()*256);
        this.tam = Math.floor(Math.random() * 10 + 15);
        this.px = Math.floor(Math.random() * (largura_palco - this.tam));
        this.py = Math.floor(Math.random() * (altura_palco - this.tam));
        this.directionX = Math.floor(Math.random() * 10 + 1 > 5 ? 1 : -1);
        this.directionY = Math.floor(Math.random() * 10 + 1 > 5 ? 1 : -1);
        this.velX = Math.floor(Math.random()*2)+1;
        this.velY = Math.floor(Math.random()*2)+1;
        this.id = id++;
        this.eu = this.spawnar(palco);
        this.intervalo = setInterval(this.mover, 10);
    }

    spawnar = (palco)=>{
        const div = document.createElement('div');
        div.id = this.id;
        div.classList.add('ball');
        div.style = `left:${this.px}px; top:${this.py}px; width:${this.tam}px; height:${this.tam}px; background-color: rgb(${this.r}, ${this.g}, ${this.b}); border-radius: 50%;`
        palco.appendChild(div);
        return div;
    }

    checar_bordas = ()=>{
        if(this.px + this.tam >= largura_palco) {
            this.directionX = -1;
        } else if(this.px <= 0) {
            this.directionX = 1;
        }
        
        if(this.py + this.tam >= altura_palco) {
            this.directionY = -1;
        } else if(this.py <= 0) {
            this.directionY = 1;
        }
    }

    checar_colisao = ()=>{
        array_bolas.forEach((obj)=>{
            if(obj.id === this.id) return;
            if(obj.px === this.px) {this.px *= -1; return;}
            if(obj.py === this.py) {this.py *= -1; return;}
        })
    }

    mover = ()=>{
        this.checar_bordas();
        // this.checar_colisao();

        this.px += this.velX * this.directionX;
        this.py += this.velY * this.directionY;

        this.eu.style = `left:${this.px}px; top:${this.py}px; width:${this.tam}px; height:${this.tam}px; background-color: rgb(${this.r}, ${this.g}, ${this.b}); border-radius: 50%;`

        if(this.px > largura_palco || this.py > altura_palco) {
            this.remover();
        }
    }

    remover = ()=>{
        this.eu.remove();
        clearInterval(this.intervalo);
        array_bolas = array_bolas.filter((obj) => {
            return obj.id != this.id;
        });
        p_numero_objetos.innerText = array_bolas.length;
    }
}