// update credentials in the local collection.json
// pass blank args where necessary 
// (e.g. node configureCreds "" "" "myUsername" "myPassword" )

let fs = require('fs');

let collectionDir = 'collection.json';
let fileJSON = '';
let client_id = process.argv[2];
let client_secret = process.argv[3];
let username = process.argv[4];
let password = process.argv[5];

/*
// necessary if prod creds != stag creds
// do not worry about production vs staging yet
let username_production = process.argv[4];
let password_production = process.argv[5];
let username_staging = process.argv[6];
let password_staging = process.argv[7];
*/

fs.readFile(collectionDir, 'utf8', (err, data) => {
	if (err) {
		throw err;
	}

	fileJSON = JSON.parse(data);
	if (client_id && client_secret) {
		fileJSON.collection.variable.forEach((element) => {
			if (element.key == 'client_id') {
				element.value = client_id;
			}
			if (element.key == 'client_secret') {
				element.value = client_secret;
			}
		});
	}

	if (username && password) {
		fileJSON.collection.auth.basic.forEach((element) => {
			if (element.key == 'username') {
				element.value = username;
			}
			if (element.key == 'password') {
				element.value = password;
			}
		});
	}

	fs.writeFile(collectionDir, JSON.stringify(fileJSON, null, 2), (err) => {
		if (err) {
			throw err;
		} else {
			console.log('Updated credentials in collection.json.');
		}
	});
});
