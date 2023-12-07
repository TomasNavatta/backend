import { fileURLToPath } from "url"
import { dirname } from "path"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function ensureDirectoryExists(filePath) {
    const directory = dirname(filePath);
    try {
        await fs.promises.access(directory);
    } catch (error) {
        await fs.promises.mkdir(directory, { recursive: true });
    }
}


export default __dirname
