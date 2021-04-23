const fs = require('fs');

//Loads each initialization file as promise and returns a promise
const loader = (confObj)=> new Promise((resolve,reject) =>{
    try {
        const ps = []
        fs.readdirSync(__dirname).forEach(file => {
            if (file != "init.js"){
                const r = require(`./${file.slice(0,-3)}`)
                ps.push(r(confObj));
            }
        });
        Promise.all(ps)
        .then((val)=> resolve(val))
        .catch(err => reject(err))
    }catch (err) {
        reject(err)
    }
});

module.exports = loader