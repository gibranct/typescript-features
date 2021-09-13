
function merge<T extends object, U extends object>(a: T, b: U) {
    return Object.assign(a, b)
}

const mergedObj = merge({ name: 'Gibran' }, { age: 30 })

console.log(mergedObj.name)

interface Lenghty {
    length: number
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element'
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('Gibran'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key]
}

extractAndConvert({ name: 'Gibran' }, 'name')