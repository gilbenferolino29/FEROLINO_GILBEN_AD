var number = 0;
var prime = true;

//BEFORE ENTERING THE LOOP, CHECK NUMBER AS 1 IS NOT A PRIME NUMBER
if (number == 1)
    prime = false

for (var ctr = 2; ctr < number; ctr++) {
    if ((number % ctr) == 0) {
        prime = false;
    }
}
if (number <= 0) {
    console.log(`I can't seem to check that number as ${number} is not a valid number in checking Prime Numbers.\nPlease do try again :)`);
} else
    console.log(`${number} is a prime number? ${prime}`);