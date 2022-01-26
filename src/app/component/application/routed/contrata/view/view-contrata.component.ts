import { IContrata } from 'src/app/model/contrata-interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContrataService } from 'src/app/service/contrata.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';

@Component({
selector: 'app-view-contrata',
templateUrl: './view-contrata.component.html',
styleUrls: ['./view-contrata.component.css']
})
export class ViewContrataComponent implements OnInit {
  strEntity: string = "contrata"
  strOperation: string = "view"
  strTitleSingular: string = "Contrata";
  strTitlePlural: string = "Contratas";

  id: number = 0;
  oContrata: IContrata;
  oUserSession: IUsuario;

  constructor(
    private oContratasService: ContrataService,
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

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getOne();
  }

  ngOnInit() {
  }

  getOne = () => {
    this.oContratasService.get(this.id).subscribe((oData: IContrata) => {
      this.oContrata = oData;
    })
  }
  
  goBack() {
    this.oLocation.back();
  }
}
 