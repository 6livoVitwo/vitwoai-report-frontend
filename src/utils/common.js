export const camelCaseToReadable = (camelCaseStr) => {
    let readableStr = camelCaseStr.replace(/([A-Z])/g, ' $1');
    readableStr = readableStr.charAt(0).toUpperCase() + readableStr.slice(1);
    return readableStr;
}