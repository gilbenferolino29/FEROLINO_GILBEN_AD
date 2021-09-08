//function multiply(a, b) { a * b };

for (var ctr = 1; ctr <= 10; ctr++) {
    var product = '';
    for (var ctr2 = 1; ctr2 <= 10; ctr2++) {
        //No \t indent
        // if (ctr * ctr2 < 10) {
        //     product += `${ctr2*ctr} `;
        // } else
        //     product += ` ${ctr2*ctr}`;

        //With Indent
        product += `${ctr*ctr2}\t`;
    }
    console.log(product);
}