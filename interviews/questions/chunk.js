export default function chunk(array, size = 1) {
    const newArr = [];
    for (let idx = 0; idx < array.length; idx += size) {
        newArr.push(array.slice(idx, idx+size))
    }
    return newArr
}