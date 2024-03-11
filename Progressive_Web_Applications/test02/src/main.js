"use strict";

if("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
        .then(reg => console.log(reg))
        .catch(err => console.error(err));
    });
}

window.addEventListener("beforeinstallprompt", (evt) => {
    bindButtonToPrompt(evt);
});

function bindButtonToPrompt(deferredPrompt) {
    const btnAdd = document.querySelector("#btnAdd");
    btnAdd.style.display = "block";
    btnAdd.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
            console.log(choice.outcome);
        });
    });
}

function bindNotificationToButton() {
    const btnPush =  document.querySelector("#btnPush");
    btnPush.addEventListener("click", () => {
        Notification.requestPermission().then(permission => console.log(permission))
    });
}
bindNotificationToButton();