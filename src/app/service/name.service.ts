import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor() { }

  public getName(strToken: string, strLang: string, strNumero:string): string {
    if (strLang == "esp" && strNumero=="singular") {
      switch (true) {
        // entities
        case strToken == "servicio": return "Servicio";
        case strToken == "usuario": return "Usuario";
        case strToken == "tipousuario": return "Tipo de usuario";
        case strToken == "contrata": return "Contrata";
        case strToken == "factura": return "Factura";
        // operations
        case strToken == "acciones": return "fas fa-tools";
        case strToken == "view": return "fas fa-eye";
        case strToken == "plist": return "fas fa-list";
        case strToken == "listado": return "fas fa-stream";
        case strToken == "remove": return "fas fa-trash";
        case strToken == "new": return "fas fa-plus";
        case strToken == "edit": return "fas fa-pen";
        case strToken == "print": return "fas fa-print";
        case strToken == "random": return "fas fa-random";
        // login/logout
        case strToken == "home": return "fas fa-home";
        case strToken == "login": return "fas fa-sign-in-alt";
        case strToken == "logout": return "fas fa-sign-out-alt";
        case strToken == "usuarios": return "fas fa-user-friends";
        case strToken == "accesoSistema": return "fas fa-key";
        case strToken == "entradaSistema": return "fas fa-sign-in";
        case strToken == "salidaSistema": return "fas fa-sign-in";
        case strToken == "reset": return "fas fa-brush";
        case strToken == "carroImagenes": return "fas fa-cart-plus";
        // forms
        case strToken == "filtro": return "fas fa-filter";
        case strToken == "buscar": return "fas fa-search";
        case strToken == "rpp": return "fas fa-file-alt";
        case strToken == "ok": return "fas fa-check-square";
        case strToken == "rechazar": return "fas fa-times-circle";
        case strToken == "volver": return "fas fa-arrow-circle-left";
        // arrows
        case strToken == "flechaUp": return "fas fa-arrow-up";
        case strToken == "flechaDown": return "fas fa-arrow-down";
        // selections
        case strToken == "seleccionar": return "fas fa-check";
        // status
        case strToken == "success": return "fas fa-check-circle";
        case strToken == "fail": return "fas fa-times-circle";
        //GitHub footer
        case strToken == "github": return "fab fa-github";
        case strToken == "github-alt": return "fab fa-github-alt";
        //Impresión
        case strToken.startsWith("report"): return "fas fa-copy";
        default: return 'fas fa-question';
      }
    }

  }
}

