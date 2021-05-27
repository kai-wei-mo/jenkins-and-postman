// update token in the local collection.json

let fs = require('fs');

let collectionDir = 'collection.json';
let fileJSON = '';
let token = process.argv[2];

fs.readFile(collectionDir, 'utf8', (err, data) => {
	if (err) {
		throw err;
	}

	fileJSON = JSON.parse(data);
	fileJSON.collection.variable.forEach((element) => {
		if (element.key == 'token') {
			element.value = token;
		}
	});

	fs.writeFile(collectionDir, JSON.stringify(fileJSON, null, 2), (err) => {
		if (err) {
			throw err;
		} else {
			console.log('Updated token in collection.json.');
		}
	});
});
