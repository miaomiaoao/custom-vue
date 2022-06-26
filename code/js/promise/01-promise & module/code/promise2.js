var promise1 = new Promise((resolve, reject) => {setTimeout(resolve, 1000)})
var promise2 = new Promise((resolve, reject) => {setTimeout(resolve, 2000)});

promise1.then(function() {return 'hello world'}).then(function(val) {return promise2})