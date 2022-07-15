export enum AlertTypes {
    Debug = 'debug',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
};

export type Alert = {
    title: string;
    message: string;
    type: AlertTypes;
};