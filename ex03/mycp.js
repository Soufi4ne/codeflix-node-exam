const fs = require('fs');
const path = require('path');
const args = process.argv.splice(2);
if(args.length === 2)
    cpFiles(args[0], args[1], true);
else if(args.length === 3 && args[0] === '-r')
    cpDirectory(args[1], args[2]);

function cpFiles(file, target, printResult) {
    fs.readFile(file, (err, data) => {
        if(err)
            throw err;
        const content = data.toString();
        fs.writeFile(target, content, () => {
            if(printResult)
                console.log(`File ${file} copied to ${target}.`)
        });
    });
}

function cpDirectory(directory, target) {
    const isDirectory = fs.statSync(directory).isDirectory();
    if(isDirectory) {
        fs.mkdir(target, () => {
            console.log(`Copying ${directory} to ${target}`);
        });
        fs.readdir(directory, (err, files) => {
            if(err)
                throw err;
            files.forEach((file) => {
                const newDirectory = path.join(directory, file);
                const newTarget = path.join(target, file);
                cpDirectory(newDirectory, newTarget);
            });
        });
    } else
        cpFiles(directory, target, false);
}