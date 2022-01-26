export interface IDate {
    year: number,
    month: number,
    day: number
}

export interface ITime {
    hour: number,
    minute: number
}

export interface IHorario {
    date: IDate,
    time: ITime
}

export interface I2Send {
    id: number,
}

export interface IPost {
    id: number,
    titulo: string,
    cuerpo: string,
    horario: IHorario,
    etiquetas: string,
    visible: boolean
}

export interface IPage {
    content: IPost[];
    totalElements: number,
    totalPages: number
}

export interface IPost2Send {
    id: number,
    titulo: string,
    cuerpo: string,
    horario: string,
    etiquetas: string,
    visible: boolean
}

export interface IReport {
    codigo: string,
    nombre: string
}

export interface IPrint {
    fechainicial:string;
    fechafinal:string;
}