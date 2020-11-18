const readline = require('readline');
const fs = require('fs');
const args = process.argv.splice(2);
if(args.length === 0)
    printLine();
else if(args.length === 1)
    printFile(args[0], false);
else if(args.length === 2 && args[0] === '-e')
    printFile(args[1], true);

function printLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', (input) => console.log(input));
}

function printFile(file, endLines) {
    fs.readFile(file, (err, data) => {
        if(err)
            throw err;
        if(!endLines)
            console.log(data.toString());
        else {
            data.toString().split(/\r\n/g).forEach((line) => {
                console.log(`${line}$`)
            });
        }
    });
}