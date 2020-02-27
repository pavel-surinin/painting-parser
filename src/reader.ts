import { Logger } from './logger'
import { readdirSync } from 'fs'
import { join } from 'path'
const LOGGER = new Logger('reader')
const CURRENT_DIR = process.cwd();

export async function readCurrentDir(): Promise<string[]> {
    LOGGER.info(`Reading current dir '${CURRENT_DIR}'`)
    const pictures = readdirSync(CURRENT_DIR)
        .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'))
    if (pictures.length) {
        LOGGER.debug(`found ${pictures.length} files: ${pictures.join(', ')}`)
        return pictures.map(p => join(CURRENT_DIR, p))
    } else {
        LOGGER.info(`Could not find any picture files (jpg, jpeg, png)`)
        return []
    }
}

export async function readFromFile(fileName: string): Promise<string[]> {
    LOGGER.info(`Reading file ${fileName} in current dir '${CURRENT_DIR}'`)
    const targetFile = readdirSync(CURRENT_DIR).find(file => file.includes(fileName))
    if (targetFile) {
        const filePath = join(CURRENT_DIR, fileName)
        LOGGER.info(`Found file ${filePath}`)

        const urls: string[] = []
        require('fs').readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach(function (line: string) {
            LOGGER.debug(`Found url: '${line}'`)
            urls.push(line)
        });

        return urls;

    } else {
        LOGGER.info(`Could not find any files matching name ${fileName}`)
        return []
    }
}