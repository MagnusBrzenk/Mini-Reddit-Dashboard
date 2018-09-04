/**
 * Ensures input data has requisite properties
 * @param input
 */
export function verifyDataFormat(input: any): boolean {
    return !!input.every((el: any) => typeof el === "number");
}
