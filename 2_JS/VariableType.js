// var number = 1;
// var a = [1, 2, 3, 4, 5, 6]
// var b = { one: 1, "two": "two", three: [3] };
// var c;
// var d = null;
// console.log(typeof b);
// console.log(`The variable ${b} is of type ${typeof d}`);
// console.log(b);
// b.four = "HI ALL!";
// console.log(b);
// b["five"] = ["HAHAHAHAH", "MEOW"];
// console.log(b);
// console.log(b);
// console.log(b.six); //UNDEFINED

//^^^^^^^^^^^^^^^ FOLLOWING WITH THE DISCUSSION ^^^^^^^^^^^^^^^^^^^^^^

//Number
var notNumber = 1;
console.log(notNumber);
console.log(`The variable (${notNumber}) is of type ${typeof notNumber}\n`);
//String
var definitelyNotString = "I am a string :3"
console.log(definitelyNotString);
console.log(`The variable (${definitelyNotString}) is of type ${typeof definitelyNotString}\n`);
//Boolean
var handsome_checker = true;
console.log(handsome_checker);
console.log(`The variable (${handsome_checker}) is of type ${typeof handsome_checker}\n`);
//Object, Null, Array
//Object
var array = { height: 178, weight: 64, gender: "male", course: "BSCS", empty: null }
console.log(array);
console.log(`The variable (${array}) is of type ${typeof array}\n`);
//Undefined
console.log(array.name);
console.log(`The variable (${array.name}) is of type ${typeof array.name}\n`);
//Null
console.log(array.empty);
console.log(`The variable (${array.empty}) is of type ${typeof array.empty}\n`);
//Symbol
console.log(typeof Symbol('Power'))