export function dateToString(dateString) {
    const date = new Date(Date.parse(dateString));
    return `${intToTwoCharString(date.getDate())}.${intToTwoCharString(date.getMonth() + 1)}.${intToTwoCharString(date.getFullYear() % 100)} ${intToTwoCharString(date.getHours())}:${intToTwoCharString(date.getMinutes())}`;
}

function intToTwoCharString(a) {
    return a < 10 ? `0${a}` : String(a);
}