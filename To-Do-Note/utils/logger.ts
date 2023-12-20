export const LEVEL_INFO = "info";
export const LEVEL_WARN = "warn";
export const LEVEL_ERROR = "error";

export const LOGGER_NAME = "my-app";

export const DESTINATIONS = [
    console.log,
    (message: string, level: string) => {
        console.log(`[${level}] [${LOGGER_NAME}] ${message}`);
    },
];

export function logger(message: string, level: string):void{
    for(const destination of DESTINATIONS){
        destination(message, level);
    }
}