const fs = require('fs');

const log = (filepath,text) =>{
    return new Promise( (resolve, reject) => { 
        fs.access(filepath, (err) => {
            if (err) {
                fs.writeFile(filepath, text, function (err) {
                    if (err) {
                        reject(err)
                    }
                    resolve()
                });
            } else {
                fs.appendFile(filepath, text , function (err) {
                    if (err) {
                        reject(err)
                    }
                    resolve()
                });
            }
        });
    })
}


module.exports = log