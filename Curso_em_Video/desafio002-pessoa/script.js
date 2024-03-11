let img = document.getElementById('personImage');
let message = document.getElementById('message');

function verifyData() {
    let birth = Number(document.getElementById('idnumber').value)
    let gender = document.querySelector("input[name='gender']:checked").value;

    let year = new Date().getFullYear();
    verifyBirth(birth, year);

    let age = year - birth;

    if(gender === 'M') {
        if(age < 18) {
            img.src = 'imagens/Site-community-image.webp';
            
        }
        else if(age < 45) {
            img.src = 'imagens/FDs1f_bXoAkcn6-.webp';
        }
        else {
            img.src = 'imagens/2hg8v1X_400x400.webp';
        }
    }

    else if(gender === 'NON') {
        if(age < 18) {
            img.src = 'imagens/3c12e213d73315005d809bf78512408f.jpg';
            
        }
        else if(age < 45) {
            img.src = 'imagens/64d44235-1dee-4bca-95da-bee1ee96eea3-profile_image-300x300.png';
        }
        else {
            console.log('oi')
            img.src = 'imagens/lh.jpg';
        }
    }

    else {
        if(age < 18) {
            img.src = 'imagens/philomela.jpg';
            
        }
        else if(age < 45) {
            img.src = 'imagens/FDs1f_bXoAkcn6-.webp';
        }
        else {
            console.log('oi')
            img.src = 'imagens/lh.jpg';
        }
    }

    img.style.display = 'block'
    message.innerText = `Age: ${age}, Gender: ${gender}`;

}

function verifyBirth(birth, year) {
    if(birth === 0) {
        alert('Insert your birth year correctly')
        throw "birth === 0"
    }

    if(birth > year) {
        window.alert("Incorrect birth year");
        throw "birth > age"
    }
}