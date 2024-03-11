let confirm = document.querySelector('#confirm');
confirm.addEventListener('click', count);

function count() {
    let start = document.querySelector('input[name=start]').value;
    let end = document.getElementById('idend').value;
    let step = document.getElementById('idstep').value;

    if(start === '' || end === '' || step === '') {
        window.alert('Please fill in all fields');
        return;
    }

    start = Number(start);
    end = Number(end);
    step = Number(step);

    if(step <= 0) {
        window.alert('Step field must be higher than zero');
        return;
    }

    let title = document.createElement('p');
    title.innerText = 'Counting:'
    title.style.fontWeight = 'bold'
    title.style.textAlign = 'center';
    // title.style.width = '100%';
    // title.style.marginBottom = '-20px';

    // let p = document.createElement('p');
    // p.style.lineHeight = 2;
    // p.style.textAlign = 'justify';

    let div = document.createElement('div');
    div.setAttribute('class', 'divCounter')
    title.style.gridColumn = '1/-1'
    div.appendChild(title);
    div.style.display = 'grid'
    div.style.gridTemplateColumns = 'repeat(auto-fill, minmax(75px, 1fr))'
    div.style.gap = '10px 0'
    div.style.justifyItems = 'center';

    if(start > end) {
        step *= -1;
        for(let i = start; i >= end; i+=step) {
            let p = generateParagraph(i);
            div.appendChild(p);
            // console.log(i)
        }
    } else {
        for(let i = start; i <= end; i+=step) {
            let p = generateParagraph(i);
            div.appendChild(p);
            // console.log(i)
        }
    }

    let container = document.getElementsByClassName('container')[0];
    let shouldRemove = document.querySelector('.divCounter');
    if(shouldRemove) {
        // console.log('oi')
        shouldRemove.remove();
    }
    container.appendChild(div);
    // container.appendChild(p);
}

function generateParagraph(i) {
    let p = document.createElement('p');
    p.innerText = `\u{1F449}${i.toFixed(2)}`;
    p.style.whiteSpace = 'no-wrap';
    p.style.border = '1px solid black';
    p.style.verticalAlign = 'middle';
    return p;
}