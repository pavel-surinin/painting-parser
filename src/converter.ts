import { read } from 'jimp'
import { Logger } from './logger'
import { join } from 'path'

const LOGGER = new Logger('converter')
const CURRENT_DIR = process.cwd()
const OUTPUT_DIR = 'output'
const MAX_SIZE = 1000

interface ConverterOptions {
    startNumber: number
    paths: string[]
}

export async function converter(options: ConverterOptions) {
    let nameNumber = options.startNumber;
    options.paths.forEach(async path => {
        await read(path, (err, image) => {
            if (err) throw err;
            let s = join(CURRENT_DIR, OUTPUT_DIR, `${nameNumber}s.jpg`)
            let a = join(CURRENT_DIR, OUTPUT_DIR, `${nameNumber++}a.jpg`)
            LOGGER.info(`fetched ${path}`)

            const w = image.getWidth()
            const h = image.getHeight()
            if (w > MAX_SIZE || h > MAX_SIZE) {
                LOGGER.info(`Image is too big: ${w} x ${h}`)
                if (w > h) {
                    const newW = MAX_SIZE
                    const newH = Math.floor(MAX_SIZE * (h / w))
                    LOGGER.info(`Resizing to: ${newW} x ${newH}`)
                    image.resize(newW, newH)
                } else {
                    const newW = Math.floor(MAX_SIZE * (w / h))
                    const newH = MAX_SIZE
                    LOGGER.info(`Resizing to: ${newW} x ${newH}`)
                    image.resize(newW, newH)
                }
            }

            LOGGER.info(`writing to ${a}`)
            image
                .quality(60)
                .write(a);

            LOGGER.info(`writing to ${s}`)
            image
                .cover(261, 269)
                .quality(60)
                .write(s);
            LOGGER.info(`~~~`)
        });

    })
}
