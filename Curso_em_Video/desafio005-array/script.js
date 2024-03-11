let array = [];
let select = document.getElementById('idarray');

function addNumber() {
    checkResponse();
    let input = document.querySelector("input[type=number]");
    if(input.value.length == 0) {
        window.alert('Please insert a number');
        return;
    }

    let n = Number(input.value);
    for(let number of array) {
        if(number === n) {
            window.alert('This number was already inserted');
            return;
        }
    }

    array.push(n);

    let option = document.createElement('option');
    option.style.padding = '0 7px'
    option.innerText = `Inserted ${n}`;
    select.appendChild(option);
}

function finalize() {
    if(array.length === 0) {
        window.alert('No numbers were inserted');
        return;
    }

    let smallest = array[0];
    let biggest = array[0];
    let sum = 0;
    for(let number of array) {
        if(number < smallest) {
            smallest = number;
        }

        if(number > biggest) {
            biggest = number;
        }

        sum += number;
    }

    checkResponse();
    response = document.createElement('div');
    response.setAttribute('class', 'response');

    let phrases = [
        `Total of numbers: ${array.length}`,
        `Biggest number: ${biggest}`,
        `Smallest number: ${smallest}`,
        `Total Sum: ${sum}`,
        `Average: ${sum / array.length}`
    ];

    for(let phrase of phrases) {
        let p = document.createElement('p');
        p.innerText = phrase;
        response.appendChild(p);
    }
    response.style.marginTop = '20px';
    response.style.display = 'grid';
    response.style.gap = '10px';

    document.querySelector('.container').appendChild(response);
}

function checkResponse() {
    let response = document.querySelector('.response');
    if(response) {
        response.remove()
    }
}