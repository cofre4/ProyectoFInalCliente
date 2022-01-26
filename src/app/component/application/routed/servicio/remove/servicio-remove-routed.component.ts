import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IServicio } from 'src/app/model/servicio-interfaces';
import { ServicioService } from 'src/app/service/servicio.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-servicio-remove-routed',
  templateUrl: './servicio-remove-routed.component.html',
  styleUrls: ['./servicio-remove-routed.component.css']
})
export class ServicioRemoveRoutedComponent implements OnInit {
  strEntity: string = "servicio"
  strOperation: string = "remove"
  strTitleSingular: string = "Servicio";
  strTitlePlural: string = "Servicios";
  id: number = 0;
  oService: IServicio;
  oUserSession: IUsuario;
  strResult: string = null;

  constructor(
    private oServicioService: ServicioService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    public oIconService: IconService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    this.id = this.oActivatedRoute.snapshot.params.id
    // llamada al servidor
    this.getOne();
  }

  ngOnInit(): void {
  }

  getOne = () => {
    this.oServicioService.get(this.id).subscribe((oData: IServicio) => {
      this.oService = oData;
    })
  }

  removeOne() {
    this.oServicioService.removeOne(this.id).subscribe((oData: IServicio) => {
      if (oData) {
        this.strResult = this.strTitleSingular +  ' con ID=' + this.id + ' ha sido borrado con éxito';
      } else {
        this.strResult = 'Error en el borrado de ' + this.strTitleSingular;
      }
      this.openPopup();
    })
  }

  goBack() {
    this.oLocation.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/plist']);
  }



}
