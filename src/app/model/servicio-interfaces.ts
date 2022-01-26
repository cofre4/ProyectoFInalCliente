import { I2Send, IHorario } from "./model-interfaces";


export interface IFile {
    file: File
}
export interface IServicio {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,

    contratas: number
}
export interface IServicio2Send {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
}

export interface IPageServicio {
    content: IServicio[];
    totalElements: number,
    totalPages: number
}
