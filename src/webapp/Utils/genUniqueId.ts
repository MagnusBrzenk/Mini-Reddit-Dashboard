let lastId: number = 0;
/**
 * Super short/simple mechanism for generating unique ids for HTMLElements
 * @param prefix
 */
export function genUniqueId(prefix = "id") {
    lastId++;
    return `${prefix}${lastId}`;
}
