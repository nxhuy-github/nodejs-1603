const { addPromise, multPromise, divPromise } = require('./addPr');

// addPromise(3,4)
// .then(ab => multPromise(ab, 5))
// .then(abh => divPromise(abh, 2))
// .then(square => console.log(square));

// Version không tái sử dụng
// function getSquare(a, b, h) {
//     addPromise(a, b)
//     .then(ab => multPromise(ab, h))
//     .then(abh => divPromise(abh, 2))
//     .then(square => console.log(square));
// }
//
// getSquare(3,4,5);

// Version tái sử dụng
function getSquare(a, b, h) {
    return addPromise(a, b)
    .then(ab => multPromise(ab, h))
    .then(abh => divPromise(abh,2));
}

getSquare(3, 4, 5)
.then(square => console.log(square))
.catch(err => console.log(err.toString())); // ~ lỗi auto nhảy vào catch, dù là lỗi gì

// Version viết code "trông giống" đồng bộ, nhưng thật ra bản chất vẫn là bất đồng bộ
// Cặp từ khoá async-await
async function getSquareAsync(a, b, h){
    const ab = await addPromise(a, b);
    const abh = await multPromise(ab, h);
    const square = await divPromise(abh, 2);
    //console.log(square);
    return square;
}

// getSquareAsync(3, 4, 5)
// .then(a => console.log(a));

// Version async-await with try-catch
async function getSquareAsync(a, b, h){
    try {
        const ab = await addPromise(a, b);
        const abh = await multPromise(ab, h);
        const square = await divPromise(abh, 2);
        return Promise.resolve(square) // đảm bảo cả 3 thằng trên đều thành công
                                       // đây chỉ là về style code, vì nếu 1 trong 3 thằng sai nó vẫn nhảy vào catch 
    } catch (err) {
        return Promise.reject(err);
    }
}

// app.get('/showProduct', async (req, res) => {
// })

