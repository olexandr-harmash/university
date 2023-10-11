export function encodeParam(value) {
    return value.replace(' ', '%20').replace('&', '%26');
}