// update credentials in the local collection.json

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

let collectionDir = 'collection.json';
let fileJSON = '';

fs.readFile(collectionDir, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }

    fileJSON = JSON.parse(data);
    if (fileJSON.collection.variable) {
        fileJSON.collection.variable.forEach((element) => {
            for (const property in argv) {
                if (element.key == property) {
                    element.value = argv[property];
                }
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
