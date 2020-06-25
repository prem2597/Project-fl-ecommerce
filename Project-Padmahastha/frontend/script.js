var xlsx = require("xlsx");

var wb = xlsx.readFile("Products.xlsx");

var ws = wb.Sheets["Sheet1"];

var data = xlsx.utils.sheet_to_json(ws);

// console.log(data);

// var arr = [1,2,3,4,5,6,7,8,9]

var newArr = [];
while(data.length) newArr.push(data.splice(1,4));



console.log(newArr[0][1][1]);
