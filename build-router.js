const fs = require('fs');

console.log("sss");
//const routes = require('./src/router/routes.js');
const routes = ["obsPlugins/plugin-list", "obsPlugins/plugin-detail"]
var str = ""
for (let index = 0; index < routes.length; index++) {
  str += routes[index] + "\n"
}


fs.writeFileSync('../www.scapestar.com/obsPlugins/vueRouter', `${str}`); 
let Robots = "User-agent: * \n Disallow:"  
fs.writeFileSync('../www.scapestar.com/obsPlugins/robots.txt', `${Robots}`); 
