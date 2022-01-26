import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFactura, IFactura2Send } from 'src/app/model/factura-interfaces';
import { FacturaService } from 'src/app/service/factura.service';
import { DateTimeService } from 'src/app/service/datetime.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { UsuarioService } from 'src/app/service/usuario.service';

declare let $: any;

@Component({
  selector: 'app-edit-factura',
  templateUrl: './edit-factura.component.html',
  styleUrls: ['./edit-factura.component.css']
})
export class EditFacturaComponent implements OnInit {

  oFactura2Show: IFactura = null;
  oFactura2Send: IFactura2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  strUsuarioSession: string;
  strEntity: string = "factura"
  strOperation: string = "edit"
  strTitleSingular: string = "Factura";
  strTitlePlural: string = "Facturas";

  get f() { return this.oForm.controls; }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oFacturaService: FacturaService,
    private oUsuarioService: UsuarioService,
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

    this.id = this.oActivatedRoute.snapshot.params.id
    this.get();

  }

  ngOnInit(): void {

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

  get = (): void => {
    this.oFacturaService.getOne(this.id).subscribe((oData: IFactura) => {
      // console.log(oData);
      this.oFactura2Show = oData;
      this.oForm = this.oFormBuilder.group({
        id: [this.oFactura2Show.id],
        fecha: [this.oFactura2Show.fecha, Validators.required],
        id_usuario: [this.oFactura2Show.usuario.id, Validators.required],
        pagado: [this.oFactura2Show.pagado]

      });
      $('#fecha').val(this.oFactura2Show.fecha);

    })
  }

  update = (): void => {
    console.log(this.oFactura2Send);
    this.oFacturaService.Update(this.oFactura2Send).subscribe((result: number) => {
      if (result) {
        this.strResult = "La factura se ha modificado correctamente";
      } else {
        this.strResult = "Error en la modificación de la factura";
      }
      this.openPopup();
    })
  }

  goBack(): void {
    this.oLocation.back();
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oFactura2Send = {
        id: this.oForm.value.id,
        fecha: this.oForm.value.fecha,
        usuario: {
          id: this.oForm.value.id_usuario
        },
        pagado: this.oForm.value.pagado

      }
      this.update();
    }
  }

  //modal

  fila: IUsuario;
  id_tipousuario: number = null;
  showingModal: boolean = false;

  eventsSubjectShowModal: Subject<void> = new Subject<void>();
  eventsSubjectHideModal: Subject<void> = new Subject<void>();

  openModal(): void {
    this.eventsSubjectShowModal.next();
    this.showingModal = true;
  }

  onCloseModal(): void {
    //this.oRouter.navigate(['factura/view/' + this.id]);
  }

  closeModal(): void {
    this.eventsSubjectHideModal.next();
    this.showingModal = false;
  }

  onSelection($event: any) {
    console.log("edit evento recibido: " + $event)
    this.oForm.controls['id_usuario'].setValue($event);
  }

  onChangeUsuario($event: any) {

    console.log("--->" + this.oForm.controls['id_usuario'].value);
    this.oForm.controls['id_usuario'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModal) {
      this.closeModal();
    }

    //actualizar el usuario
    this.oUsuarioService
      .getOne(this.oForm.controls['id_usuario'].value)
      .subscribe((oData: IUsuario) => {
        this.oFactura2Show.usuario = oData;
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