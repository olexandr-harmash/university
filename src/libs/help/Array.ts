export function mapToArray(map: Map<any, any>) {
    return Array.from(map, (v) => v[1]);
}