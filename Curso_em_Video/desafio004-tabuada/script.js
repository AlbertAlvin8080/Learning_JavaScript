function generateTable() {
    let n = Number(document.querySelector('#idnumber').value);
    let select = document.querySelector('#idtable');

    if (n === 0){
        window.alert('Please input a number other than zero.');
        select.style.display = 'none';
        return;
    }

    select.style.display = 'initial'
    for(let i = 1; i <= 10; ++i) {
        let option = document.querySelector(`#id${i}`);
        option.innerText = `${n} * ${i} = ${n*i}`;
        // select.appendChild(option);
    }
}