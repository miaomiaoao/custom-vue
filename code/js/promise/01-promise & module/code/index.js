var promise1 = new Promise((resolve, reject) => {setTimeout(resolve, 1000)})
var promise2 = new Promise((resolve, reject) => {setTimeout(resolve, 2000)});

Promise.all([promise1, promise2])
    .then(function() {
        console.log('all promise resolved')
    })