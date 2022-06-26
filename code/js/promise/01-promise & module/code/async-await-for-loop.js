function sleep(time = 1) {
    return new Promise(resolve => setTimeout(function() {console.log('promise resolve'); resolve()}, time * 1000))
}

const promiseCreatorList = [
    sleep,
    sleep,
    sleep
]

console.log('Promise.all start', new Date().getTime())
Promise.all(
    promiseCreatorList.map(item => item())
).then(
    () => console.log('Promise.all end', new Date().getTime())
)


async function main() {
    console.log('for of async start', new Date().getTime())
    async function forOfLoop() {
        for (const promiseInstance of promiseCreatorList) {
            await promiseInstance()
        }
    }
    await forOfLoop()
    console.log('for of async end', new Date().getTime())
}
main()
