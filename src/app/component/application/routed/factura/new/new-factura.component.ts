import { IconService } from '../../../../../service/icon.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeService } from 'src/app/service/datetime.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IFactura, IFactura2Send } from 'src/app/model/factura-interfaces';
import { FacturaService } from 'src/app/service/factura.service';
import { ThrowStmt } from '@angular/compiler';

declare let $: any;
@Component({
  selector: 'app-new-factura',
  templateUrl: './new-factura.component.html',
  styleUrls: ['./new-factura.component.css']
})
export class NewFacturaComponent implements OnInit {

  oFactura2Send: any;
  id: number = 0;
  oForm: FormGroup = null;
  strResult: string = "";
  strUsuarioSession: any;

  strEntity: string = "factura"
  strOperation: string = "new"
  strTitleSingular: string = "Factura";
  strTitlePlural: string = "Facturas";

  get f() { return this.oForm.controls; }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oFacturaService: FacturaService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    private oDateTimeService: DateTimeService,
    public oIconService: IconService

  ) { 
    
    if (this.oActivatedRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oActivatedRoute.snapshot.data.message;
     localStorage.setItem("user", JSON.stringify(this.oActivatedRoute.snapshot.data.message));
   } else {
     localStorage.clear();
     oRouter.navigate(['/home']);
   }

  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      fecha: ['', Validators.required],
      pagado: [''],
      usuario: ['']
    });
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha'].setValue(dateText);
        this.oForm.controls['fecha'].markAsDirty();
      }
    });
  }

  

  onSubmit(): void {
    if (this.oForm) {
      this.oFactura2Send = {
        fecha: this.oDateTimeService.getStrFecha2Send(this.oForm.value.fecha),
        pagado: this.oForm.value.pagado,
        usuario:{ id:this.oForm.value.usuario}
      }
      this.new()
    }
  }

  new = (): void => {
 
    this.oFacturaService.Create(JSON.stringify(this.oFactura2Send)).subscribe((id: number) => {
      if (id) {
        this.id = id;
        this.strResult = "La factura se ha creado correctamente";
      } else {
        this.strResult = "Error en la creación de la factura";
      }
      this.openPopup();
    })
  }

  goBack(): void {
    this.oLocation.back();
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