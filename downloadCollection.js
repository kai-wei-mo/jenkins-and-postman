// download collection.json using Postman API

let fs = require('fs');
let axios = require('axios');

let collectionName = process.argv[2];
let apikey = process.argv[3];
let collectionDir = 'collection.json';

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
