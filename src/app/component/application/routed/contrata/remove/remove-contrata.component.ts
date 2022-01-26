
import { IContrata } from '../../../../../model/contrata-interfaces';
import { ContrataService } from '../../../../../service/contrata.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: 'app-remove-contrata',
  templateUrl: './remove-contrata.component.html',
  styleUrls: ['./remove-contrata.component.css']
})
export class RemoveContrataComponent implements OnInit {
  id: number = 0;
  oContrata: IContrata;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "contrata"
  strOperation: string = "remove"
  strTitleSingular: string = "Contrata";
  strTitlePlural: string = "Contratas";

  constructor(
    private oPostService: ContrataService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
    public oIconService: IconService
  ) {
    // control de sesión
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message.login;
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

  ngOnInit() {
  }

  getOne = () => {
    this.oPostService.get(this.id).subscribe((oData: IContrata) => {
      this.oContrata = oData;
      console.log(oData.servicio);
    })
    
  }

  removeOne() {
    this.oPostService.remove(this.id).subscribe((data: number) => {
      if (data) {
        this.strResult = "La contrata con ID=" + this.id + " ha sido borrado con éxito";        
      } else {
        this.strResult = "Error en el borrado la contrata";        
      }
      this.openPopup();
    })
  }

  goBack() {
    this._location.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }

}


