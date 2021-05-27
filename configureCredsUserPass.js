// update username and password in the local collection.json

let fs = require('fs');

let collectionDir = 'collection.json';
let fileJSON = '';
let username = process.argv[2];
let password = process.argv[3];

fs.readFile(collectionDir, 'utf8', (err, data) => {
	if (err) {
		throw err;
	}

	fileJSON = JSON.parse(data);
	fileJSON.collection.variable.forEach((element) => {
		if (element.key == 'username') {
			element.value = username;
		}
        if (element.key == 'password') {
			element.value = password;
		}
	});

	fs.writeFile(collectionDir, JSON.stringify(fileJSON, null, 2), (err) => {
		if (err) {
			throw err;
		} else {
			console.log('Updated username and password in collection.json.');
		}
	});
});
