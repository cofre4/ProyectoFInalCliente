import { IContrata } from './contrata-interfaces';
import { I2Send, IHorario } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IFactura {
    totalElements: number;
    id: number,
    usuario: IUsuario,
    fecha: IHorario,
    pagado: boolean,
    contratas: number
}
export interface IPageFactura {
    content: IFactura[];
    totalElements: number,
    totalPages: number
}

export interface IFactura2Send {
    id: number,
    fecha: string,
    pagado: boolean,
    usuario: I2Send
}