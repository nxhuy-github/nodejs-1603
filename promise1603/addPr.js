function addPromise(a, b){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                return reject(new Error('THAM SO PHAI LA KIEU NUMBER'));
            }
            resolve(a+b);
        }, 500);
    });
};

function multPromise(a, b){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                return reject(new Error('THAM SO PHAI LA KIEU NUMBER'));
            }
            resolve(a*b);
        }, 500);
    });
}

function divPromise(a, b){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                return reject(new Error('THAM SO PHAI LA KIEU NUMBER'));
            }
            if (b === 0){
                return reject(new Error('SO CHIA PHAI KHAC 0'));
            }
            resolve(a/b);
        }, 500);
    });   
}

module.exports = { addPromise, multPromise, divPromise };