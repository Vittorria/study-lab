var fs = require('fs');
var path = require('path');
// var pathToJson = path.resolve(__dirname, './conf.json');
var pathToJson = path.resolve( './conf.json');
console.log("pathToJson:", pathToJson);
var conf;
try {
    conf = JSON.parse(fs.readFileSync(pathToJson, 'utf8'));
    // console.log("env parsed:", conf);
} catch (err) {
    console.log("catch error in env.js:", err);
    throw err;
}
/*var conf = fs.readFile(pathToJson , 'utf8', function (err, data) {
  console.log("data:", err, data);
  if (err) throw err;
  conf = JSON.parse(data);
});*/

module.exports = conf;

// NOTE in conf.json in api field we should put "/" before url.
