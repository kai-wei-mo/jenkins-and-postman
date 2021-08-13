// download collection.json using Postman API

const fs = require('fs');
const axios = require('axios');
const argv = require('minimist')(process.argv.slice(2));

const collectionDir = 'collection.json';

let collectionName = argv['collectionName'];
let apikey = argv['apikey'];

let getUIDByName = async (name) => {
	let ret = '';
	let response = '';

	response = await axios.get('https://api.getpostman.com/collections', {
		params: {
			apikey: apikey,
		},
	});
	
	/* 
   		if there are multiple collections with the same name, 
   		the one with the oldest "createdAt" is returned.
		this considers local collections and forks with the same name
	*/

	response.data.collections.forEach((element) => {
		if (ret == '' && element.name == name) {
			ret = element.uid;
		}
	});

	return ret;
};

// downloads a postman collection as "collection.json"
let saveCollectionByName = async (name) => {
	let collectionID = '';
	let response = '';

	collectionID = await getUIDByName(name);

	response = await axios.get(
		`https://api.getpostman.com/collections/${collectionID}`,
		{
			params: {
				apikey: apikey,
			},
		}
	);

	fs.writeFileSync(collectionDir, JSON.stringify(response.data, null, 2));
	console.log('Saved collection.json.');
};

saveCollectionByName(collectionName);
