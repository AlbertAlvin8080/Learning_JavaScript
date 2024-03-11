"use strict";

if ("serviceWorker" in navigator) {
	window.addEventListener("load", (evt) => {
		navigator.serviceWorker
			.register("./sw.js")
			.then((reg) => console.log(reg))
			.catch((err) => console.log(err));
	});
}

let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (evt) => {
	evt.preventDefault();
	deferredPrompt = evt;
	showInstallButton();
});

function showInstallButton() {
	const btnAdd = document.querySelector("#btnAdd");
	btnAdd.style.display = "block";
	btnAdd.addEventListener("click", () => {
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === "accepted") console.log("user accepted");
			deferredPrompt = null;
		});
	});
}

window.addEventListener("appinstalled", () => {
	app.logEvent("installed");
});

const btnPush = document.querySelector("#btnPush");
btnPush.addEventListener("click", (event) => {
	requestNotificationPermission();
});

function requestNotificationPermission() {
	if (Notification.permission !== "default") {
        showPushPermissionDialog();
        return;
	}
	Notification.requestPermission();
}

function showPushPermissionDialog() {
    const permissionDialog = document.querySelector("#permission-dialog");
    permissionDialog.style.opacity = 1;
    permissionDialog.innerHTML = `
    <p>
        Notification permission is currently <strong>${Notification.permission}</strong>.
    </p>
    `;
}