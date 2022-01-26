import { IFactura } from "./factura-interfaces";
import { I2Send, IHorario } from "./model-interfaces";
import { IServicio } from "./servicio-interfaces";


export interface IPageContrata {
    content: IContrata[];
    totalElements: number,
    totalPages: number
}

export interface IContrata {
    id: number,
    precio: number,
    fecha: IHorario,
    servicio: IServicio,
    factura: IFactura

}

export interface IContrataToSend {
    id: number,
    precio: number,
    fecha: string,
    servicio: I2Send,
    factura: I2Send

}