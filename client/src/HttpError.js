export function checkHtppError(res) {
    if (res.ok) {
        return res;
    } else {
        let message = `checkHtppError Error ${res.status}: ${res.statusText}`;
        throw new Error(message);
    }
}