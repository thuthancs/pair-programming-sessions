export function convertUnixTime(number: number) {
    const dateObject = new Date(number * 1000).toLocaleString();
    return dateObject
}