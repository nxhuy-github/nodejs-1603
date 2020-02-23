//Promise

function getPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Ket Qua');
            reject('LY DO LOI');
        }, 500);
    });
}

getPromise
.then(result => console.log(result))
.catch(err => console.log(err));