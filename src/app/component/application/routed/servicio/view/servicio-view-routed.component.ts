import { ServicioService } from '../../../../../service/servicio.service';
import { Component, OnInit } from '@angular/core';
import { IServicio } from 'src/app/model/servicio-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';


@Component({
  selector: 'app-servicio-view-routed',
  templateUrl: './servicio-view-routed.component.html',
  styleUrls: ['./servicio-view-routed.component.css']
})

export class ServicioViewRoutedComponent implements OnInit {
  strEntity: string = "servicio"
  strOperation: string = "view"
  strTitleSingular: string = "Servicio";
  strTitlePlural: string = "Servicios";
  id: number = null;
  strUsuarioSession: string;
  strResult: string = null;
  oServicio: IServicio;
  oUserSession: IUsuario;


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

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();
  }

  ngOnInit() {
  }

  getOne = () => {
    this.oServicioService
      .get(this.id)
      .subscribe((oData: IServicio) => {
        this.oServicio = oData;
      });
  };

  goBack() {
    this.oLocation.back();
  }


}