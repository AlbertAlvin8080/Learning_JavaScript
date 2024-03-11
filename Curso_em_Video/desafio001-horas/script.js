let img = document.querySelector('img');

let horas = new Date().getHours();

document.getElementById('horas').innerHTML = `Agora são ${horas} horas`;

if(horas < 12) {
    img.src = 'imagens/2hg8v1X_400x400.webp'
} else if (horas < 18) {
    img.src = 'imagens//FDs1f_bXoAkcn6-.webp';
    document.querySelector('body').style.backgroundColor = '#A67763';
} else {
    img.src = 'imagens\\Site-community-image.webp';
    document.querySelector('body').style.backgroundColor = '#464748';
    document.querySelector('body').style.color = 'white'
}