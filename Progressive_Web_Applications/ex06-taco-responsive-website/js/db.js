// "use strict";

// import { db } from

// @DEPRECATED
db.enablePersistence()
.catch(err => {
	switch(err.code) {
		case "c":
			break;
	}
});

db.collection("tipos-tacos").onSnapshot((snapshot) => {
	snapshot.docChanges().forEach((change) => {
		switch (change.type) {
			case "added":
                renderTacos(change.doc.data(), change.doc.id);
				break;

			case "removed":
				removeTaco(change.doc.id);
				break;
		}
	});
});
