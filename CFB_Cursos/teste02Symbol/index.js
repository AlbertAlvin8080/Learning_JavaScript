"use strict";

const obj = {
    id: 342,
    nome: 'pedro',
    idade: 13,
}
obj[Symbol('id')] = 1232141; // symbol() gera um id indepemdente da string passada

const symbol1 = Symbol.for('nome'); // gera symbolos baseado na string passada
const symbol2 = Symbol.for('nome');
console.log(Symbol.keyFor(symbol1), symbol1 === symbol2);