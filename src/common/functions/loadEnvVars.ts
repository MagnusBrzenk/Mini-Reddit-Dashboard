import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

if (!!process.env.DISABLE_DEBUG) delete process.env.DEBUG;
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("ENV-CHECKER");

/**
 * Load and confirm existence of backend environment variables
 */
export default function loadEnvVars() {
    if (!process.env.SIMPLE_AUTH_PASSWORDS) {
        // debug("SIMPLE_AUTH_PASSWORDS NOT DEFINED!!!");
        // process.exit(0);
    }
}
