// modify isProduction in the local collection.json
// it is not safe to assume a default value of isProduction

let fs = require('fs');

let isProduction = JSON.parse(process.argv[2].toLowerCase());
let collectionDir = 'collection.json';
let fileJSON = '';

fs.readFile(collectionDir, 'utf8', (err, data) => {
	if (err) {
		throw err;
	}

	fileJSON = JSON.parse(data);
	fileJSON.collection.variable.forEach((element) => {
		if (element.key == 'isProduction') {
			element.value = isProduction.toString();
		}
	});

	fs.writeFile(collectionDir, JSON.stringify(fileJSON, null, 2), (err) => {
		if (err) {
			throw err;
		} else {
			console.log('Updated isProduction in collection.json.');
		}
	});
});
