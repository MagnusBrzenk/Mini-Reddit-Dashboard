/**
 * Ensures input data has requisite properties
 * @param input
 */
export function verifyDataFormat(input: any): boolean {
    //

    //Ensure we have an array of arrays:
    // console.log("DEBUG0");
    if (!Array.isArray(input)) return false;
    // console.log("DEBUG1");
    if (!!input.every(el => !Array.isArray(el))) return false;
    // console.log("DEBUG2");
    //Ensure that each inner array has MULTIPLE elements of the form {x: number; y: number}
    if (
        !input.every(el => {
            const bLengthTest = true; //el.length > 1;
            const bPointsFormatTest = el.every((el2: any) =>
                // !!el2.x && typeof el2.x === "number" && !!el2.y && typeof el2.y === "number"
                {
                    // const bTest0 = el2.length > 1;

                    const bTestX = el2.x !== undefined && typeof el2.x === "number";
                    const bTestY = el2.y !== undefined && typeof el2.y === "number";

                    // console.log("bTest0", bTestX, bTestY);
                    return bTestX && bTestY;
                }
            );
            // console.log("-->>", bLengthTest, bPointsFormatTest);
            return bLengthTest && bPointsFormatTest;
        })
    )
        return false;
    // console.log("DEBUG3");
    return true;
}
