"use strict";

const btn = document.querySelector('#botao');

btn.addEventListener('click', (event)=>{
    event.target.innerText = 'Processando...';
    new Promise((resolve, reject)=>{
        let number;
        setTimeout(()=>{ // setTimeout esta simulando um 'await'(?)
            number = Math.random()*99+1;
            if(number % 2 === 0) {
                resolve('Deu certo');
            } else {
                reject('Deu errado');
            }
        }, 4000);
    }).then((result)=>{
        event.target.innerText = result;
    }).catch((result)=>{
        event.target.innerText = result;
    })
});

async function main() {
    await new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let number = Math.random()*99+1;
            if(number <= 50) {
                resolve('Hello ' + Math.floor(number));
            } else {
                reject('Fail ' + Math.floor(number));
            }
        }, 1000);
    })
    .then((result)=>{
        console.log(result);
    })
    .catch((result)=>{
        console.log(result);
    });

    console.log('World');
}
main();

// ex01
new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('2 segundos com sucesso');
    }, 2000);
})
.then((result)=>{
    console.log(result);
});

// ex02
const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject('Promise rejeitada');
    }, 3000);
});
promise.catch((result)=>{
    console.log(result);
})

// ex03
function generateRandomNumber() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const n = Math.floor(Math.random()*9+1);
            if(n % 2 === 0) {
                resolve('par');
            } else {
                resolve('impar');
            }
        }, 1000);
    });
}

generateRandomNumber().then((result)=>{
    console.log(result);
});

// ex04
