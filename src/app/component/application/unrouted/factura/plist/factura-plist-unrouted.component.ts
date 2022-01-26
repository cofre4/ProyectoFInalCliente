import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IFactura, IPageFactura } from 'src/app/model/factura-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { FacturaService } from 'src/app/service/factura.service';
import { IconService } from 'src/app/service/icon.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { ContrataService } from 'src/app/service/contrata.service';
import { IContrata, IPageContrata } from 'src/app/model/contrata-interfaces';

declare let jsPDF: any;
@Component({
  selector: 'app-factura-plist-unrouted',
  templateUrl: './factura-plist-unrouted.component.html',
  styleUrls: ['./factura-plist-unrouted.component.css']
})
export class FacturaPlistUnroutedComponent implements OnInit {

  @Input() id_usuario: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  aContratas: IContrata[];
  oFacturas: IFactura[];
  aFacturas: IFactura[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;
  id2ShowViewModal: number = 0;
  strUsuarioSession: string;
  strResult: string = null;
  currentSortField: string = "";
  currentSortDirection: string = "";
  filterActual: string = "";
  filtered: boolean = false;
  oActivatedRoute: any;

  strEntity: string = "factura"
  strOperation: string = "plist"
  strTitleSingular: string = "Factura";
  strTitlePlural: string = "Facturas";
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  oFactura: IFactura;
  subjectFiltro$ = new Subject();



  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oFacturaService: FacturaService,
    public oIconService: IconService,
    public oContrataService: ContrataService
  ) {



  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());
    this.page = 0;
    this.getPage();
  }


  getPage = () => {
    let id: number = this.oRoute.snapshot.params.id ? this.oRoute.snapshot.params.id : -1;
    this.oFacturaService.getPage(this.pageSize, this.page, this.filterActual, this.currentSortField, this.currentSortDirection, id).subscribe((oPage: IPageFactura) => {
      if (this.filterActual) {
        this.filtered = true;
      } else {
        this.filtered = false;
      }
      this.aFacturas = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
    })
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }



  doResetOrder() {
    this.currentSortField = "";
    this.currentSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.currentSortField = order;
    if (this.currentSortDirection == 'asc') {
      this.currentSortDirection = 'desc';
    } else if (this.currentSortDirection == 'desc') {
      this.currentSortDirection = '';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }
  cabecera(doc: any, oFactura: IFactura): any {
    doc.setFontSize(20)
    doc.text('Factura', 25, 25)
    doc.addImage('', 'JPEG', 140, 15, 40, 35)
    doc.setFontSize(18)
    doc.text('Cliente', 20, 80)
    doc.setFontSize(16)
    doc.text(oFactura?.usuario?.nombre + " " + oFactura?.usuario?.apellidos, 20, 89)
    doc.setFontSize(14)

    doc.text(oFactura?.usuario?.email, 20, 95)
    doc.text(oFactura?.usuario?.dni, 20, 101)

    doc.setFontSize(18)
    doc.text('Empresa', 140, 80)
    doc.setFontSize(16)
    doc.text('Profiman S.L.', 140, 89)
    doc.setFontSize(14)

    doc.text('profiman@gmail.com', 140, 95)
    doc.text(oFactura?.usuario?.dni, 140, 101)
    doc.line(15, 110, 195, 110)

    doc.text('Numero', 20, 120)
    doc.text('Fecha', 20, 129)
    doc.text(oFactura.id + "", 42, 120)
    doc.text(oFactura.fecha + "", 42, 129)

    doc.text('Servicio', 20, 140)
    doc.text('Precio (€)', 130, 140)
    doc.text('Importe (€)', 170, 140)
    doc.line(15, 145, 195, 145)

    return doc;
  }

  getServicios = (tamanyo: number, factura: number) => {
    console.log("buscando...", this.strFilter);
    this.oContrataService.getPage(tamanyo, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, factura, null).subscribe((oPage: IPageContrata) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aContratas = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
      console.log(this.aContratas);

      // You'll need to make your image into a Data URL
      // Use http://dataurl.net/#dataurlmaker
      var imgData = '../../../../../../assets/img/ProfimanLogo100.png'
      var doc = new jsPDF()

      //Cabecera
      doc = this.cabecera(doc, this.oFactura);
      //Fin de cabecera

      doc.setFontSize(12)

      console.log(this.oFactura.contratas);
      console.log(this.aContratas);

      var linea = 155;
      var total=0;

      for (let i = 0; i < this.oFactura.contratas; i++) {

        doc.text(this.aContratas[i].servicio.nombre, 20, linea)
        //doc.text(this.aContratas[i].cantidad + "", 100, linea)
        doc.text(this.aContratas[i].servicio.precio + "", 130, linea)
       // doc.text((this.aContratas[i].cantidad * this.aContratas[i].servicio.precio) + "", 170, linea)

       // total= total + (this.aContratas[i].cantidad * this.aContratas[i].servicio.precio);
        linea = linea+7;

        if (linea>230){
          doc.addPage();
          doc = this.cabecera(doc, this.oFactura);
          linea=155;
          doc.setFontSize(12)
        }

      }

      doc.text('Total:', 139, linea+7)
      doc.text(total+"€", 170, linea+7)
      doc.text('IVA:', 139, linea + 14)
      //doc.text(this.oFactura.iva + "%", 170, linea + 14)
      doc.text('Total + IVA:', 139, linea + 21)
      //doc.text(total+(total*this.oFactura.iva)/100 +"€", 170, linea + 21)


      doc.save("Factura.pdf");
    })

  }

  factura(id: number) {

    this.oFacturaService.getOne(id).subscribe((oData: IFactura) => {
      this.oFactura = oData;
      this.getServicios(this.oFactura.contratas, this.oFactura.id);
      console.log(this.oFactura);



    })


  }

  print(id: number) {
    var doc = new jsPDF()
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
  }

}
