#!/usr/bin/env node

import App from 'commander'
import { converter } from './converter'
import { readFromFile, readCurrentDir } from './reader'
import { Logger } from './logger'

const LOGGER = new Logger('cli-app')

console.log(`
     .
    ":"
  ___:____      |"\\/"|
,'        \`.     \\  /
|  O        \\____/ /
~^~^~^~^~^~^~^~^~^~^~^~^~
`);

function web(cmd: { web?: string, start: number }) {
    if (cmd.web) {
        LOGGER.info(`Download from web mode`)
        readFromFile(cmd.web)
            .then(paths => converter({ paths, startNumber: cmd.start }))
            .catch(console.error)
    }
}
function fake(cmd: { local?: boolean, start: number }) {
    if (cmd.local) {
        LOGGER.info(`Converting images in current directory`)
        readCurrentDir()
            .then(paths => converter({ paths, startNumber: cmd.start }))
            .catch(console.error)
    }
}

App
    .version('0.0.1')
    .option('-w, --web <path>', 'Fetch paintings from the web')
    .requiredOption('-s, --start <start>', 'First index to name paintings')
    .option('-l, --local', 'Convert paintings in current folder')
    .action(web)
    .action(fake)
    .parse(process.argv)



// converter({
//     paths: [
//         // 'https://i.imgur.com/oZmuwVK.jpg',
//         'https://paintingvalley.com/image/watercolor-game-art-37.jpg',
//         // 'https://pirkpaveiksla.lt/images/portfolio/zmones/22a.jpg',
//         // 'https://pirkpaveiksla.lt/images/portfolio/modernus/22a.jpg'
//     ],
//     startNumber: 5
// })
//     .catch(console.error)