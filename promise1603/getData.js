const squareNumber = (i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof i !== 'number') return reject(new Error('LOI DINH DANG'));
            resolve(i * i);
        }, 2000);
    });
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Đề bài: trả về mảng bình phương của arr, nhưng lấy từng phần tử để thực hiện
// Vấn đề: làm từng hành động bất đồng bộ 1

// cả 2 cách dưới đây đều thực hiện cùng 1 lúc
// arr.forEach((e) => squareNumber(e).then(sq => console.log(sq)));

// for (let i = 0; i < arr.length; i++){
//     squareNumber(arr[i])
//     .then(kq => console.log(kq));
// }

// Recursion version
// function getData(i){
//     return squareNumber(arr[i])
//     .then(() => get(i + 1));
// }

// getData(0).catch(err => console.log('HET'));

const getAll = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        try{
            const kq = await squareNumber(arr[i]);
            console.log(kq);
        } catch (err) {
            console.log(err.toString());
        }
    }
}

getAll(arr);

// forEach ko thực hiện đc
