import { IServicio } from 'src/app/model/servicio-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeService } from 'src/app/service/datetime.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IContrata, IContrataToSend } from 'src/app/model/contrata-interfaces';
import { ContrataService } from 'src/app/service/contrata.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { FacturaService } from 'src/app/service/factura.service';
import { IFactura } from 'src/app/model/factura-interfaces';
import { ServicioService } from 'src/app/service/servicio.service';
declare let $: any;
@Component({
  selector: 'app-new-contrata',
  templateUrl: './new-contrata.component.html',
  styleUrls: ['./new-contrata.component.css']
})
export class NewContrataComponent implements OnInit {

  strEntity: string = "contrata"
  strOperation: string = "new"
  strTitleSingular: string = "Contrata";
  strTitlePlural: string = "Contrata";
  oContrata: IContrataToSend = null;
  id: IContrata = null;
  oForm: FormGroup = null;
  strResult: string = "";
  oUserSession: IUsuario;

  get f() { return this.oForm.controls; }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oContrataService: ContrataService,
    private oActivatedRoute: ActivatedRoute,
    private oFacturaService: FacturaService,
    private oServicioService: ServicioService,
    private oRoute: ActivatedRoute,
    private oLocation: Location,
    private oDateTimeService: DateTimeService,
    public oIconService: IconService
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      fecha: ['', Validators.required],
      descuento_usuario: ['', Validators.required],
      descuento_servicio: ['', Validators.required],
      servicio: ['', Validators.required],
      factura: ['']
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

      if (this.oForm.get("factura")?.value == "") {

        this.oContrata = {
          id: null,
          precio: this.oForm.value.precio,
          fecha: this.oForm.value.fecha.replace("-", "/").replace("-", "/"),
          servicio: {
            id: this.oForm.value.servicio
          },
          factura: null
        }
        console.log(this.oContrata);
        this.new();

      } else {
        console.log(this.oForm.value.fecha);
        this.oContrata = {
          id: null,
          precio: this.oForm.value.precio,
          fecha: this.oForm.value.fecha.replace("-", "/").replace("-", "/"),
          servicio: {
            id: this.oForm.value.servicio,
          },
          factura: {
            id: this.oForm.get("factura")?.value,
          }
        }
        console.log(this.oContrata);
        this.new();
      }
    }
  }

  new = (): void => {
    this.oContrataService.new(this.oContrata).subscribe((id: any) => {
      if (id) {
        this.id = JSON.parse(JSON.stringify(id));

        this.strResult = "La contrata se ha creado correctamente";
      } else {
        this.strResult = "Error en la creación de la contrata";
      }

      this.openPopup();
    })
  }

  goBack(): void {
    this.oLocation.back();
  }

  //modal

  fila: IFactura;
  id_usuario: number = null;
  showingModalFactura: boolean = false;
  showingModalServicio: boolean = false;


  eventsSubjectShowModalFactura: Subject<void> = new Subject<void>();
  eventsSubjectHideModalFactura: Subject<void> = new Subject<void>();

  eventsSubjectShowModalServicio: Subject<void> = new Subject<void>();
  eventsSubjectHideModalServicio: Subject<void> = new Subject<void>();

  openModalFactura(): void {
    this.eventsSubjectShowModalFactura.next();
    this.showingModalFactura = true;
  }

  openModalServicio(): void {
    this.eventsSubjectShowModalServicio.next();
    this.showingModalServicio = true;
  }

  onCloseModal(): void {
    //this.oRouter.navigate(['factura/view/' + this.id]);
  }

  closeModalFactura(): void {
    this.eventsSubjectHideModalFactura.next();
    this.showingModalFactura = false;
  }

  closeModalServicio(): void {
    this.eventsSubjectHideModalServicio.next();
    this.showingModalServicio = false;
  }

  onSelectionFactura($event: any) {
    console.log("edit evento recibido: " + $event)
    this.oForm.controls['factura'].setValue($event);
  }

  onSelectionServicio($event: any) {
    console.log("edit evento recibido: " + $event)
    this.oForm.controls['servicio'].setValue($event);
  }

  onChangeFactura($event: any) {

    console.log("--->" + this.oForm.controls['factura'].value);
    this.oForm.controls['factura'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModalFactura) {
      this.closeModalFactura();
    }

    //actualizar el usuario
    this.oFacturaService
      .getOne(this.oForm.controls['factura'].value)
      .subscribe((oData: IFactura) => {
        this.oContrata.factura = oData;
        //this.oUsuario = oData;
      });

    return false;
  }

  onChangeServicio($event: any) {

    console.log("--->" + this.oForm.controls['servicio'].value);
    this.oForm.controls['servicio'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModalServicio) {
      this.closeModalServicio();
    }

    //actualizar el usuario
    this.oServicioService
      .get(this.oForm.controls['servicio'].value)
      .subscribe((oData: IServicio) => {
        this.oContrata.servicio = oData;
        //this.oUsuario = oData;
      });

    return false;
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
