const fs = require('fs');
const folder = "./main/API";
const apps = []
var port = 3030
fs.readdirSync(folder).forEach(dir=>{
	if(dir=="skeleton"){return}
		console.log(dir)
	apps.join(require("./API/"+dir)(port));
	port++;
});