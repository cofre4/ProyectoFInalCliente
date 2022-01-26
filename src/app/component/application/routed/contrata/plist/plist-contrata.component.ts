import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IPageContrata } from 'src/app/model/contrata-interfaces';
import { ContrataService } from 'src/app/service/contrata.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-plist-contrata',
  templateUrl: './plist-contrata.component.html',
  styleUrls: ['./plist-contrata.component.css']
})
export class PlistContrataComponent implements OnInit {
  strEntity: string = "contrata"
  strOperation: string = "plist"
  strTitleSingular: string = "Contrata";
  strTitlePlural: string = "Contratas";
  strFilteredMessage: string = "";
  aPaginationBar: string[];
  strSortField: string = "";
  strSortDirection: string = "";
  strResult: string = null;
  strFilter: string = "";
  aContratas: any[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  id2ShowViewModal: number = 0;
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();

  id_factura: number;
  id_servicio: number;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oContrataService: ContrataService,
    private oActivatedRoute: ActivatedRoute,
    public oIconService: IconService
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id_factura = this.oActivatedRoute.snapshot.params.id_factura;
    if (this.id_factura) {
      this.strFilteredMessage = "Listado filtrado por el tipo de servicio " + this.id_factura;
    } else {
      this.strFilteredMessage = "";
    }

    this.id_servicio = this.oActivatedRoute.snapshot.params.id_servicio;
    if (this.id_servicio) {
      this.strFilteredMessage = "Listado filtrado por el tipo de servicio " + this.id_servicio;
    } else {
      this.strFilteredMessage = "";
    }

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());
  }

  getPage = () => {
    console.log("buscando...", this.strFilter);
    this.oContrataService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, this.id_factura, this.id_servicio).subscribe((oPage: IPageContrata) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aContratas = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar  = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }

  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }
}