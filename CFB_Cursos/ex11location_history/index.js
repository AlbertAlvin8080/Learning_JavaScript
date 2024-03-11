"use strict";

const btn_ir = document.querySelector('#ir');
const btn_irForward = document.querySelector('#irForward');
const input_url = document.querySelector('#iurl')

btn_ir.addEventListener('click',()=>{
    window.location.assign(input_url.value);
})

btn_irForward.addEventListener('click', ()=>{
    window.history.forward();
})