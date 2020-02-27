export class Logger {

    constructor(private readonly file: string) {
    }

    debug(...messages: string[]) {
        console.log(`[debug]\t[${this.file}]\t`, ...messages);
    }

    info(...messages: string[]) {
        console.log(`[info]\t[${this.file}]\t`, ...messages);
    }

}