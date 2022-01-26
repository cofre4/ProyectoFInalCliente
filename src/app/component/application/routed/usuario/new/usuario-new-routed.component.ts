import { TipousuarioService } from './../../../../../service/tipousuario.service';
import { IUsuario2Send } from '../../../../../model/usuario-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IconService } from 'src/app/service/icon.service';
import { IUserType } from 'src/app/model/tipousuario-interfaces';

declare let $: any;

@Component({
  selector: 'app-usuario-new-routed',
  templateUrl: './usuario-new-routed.component.html',
  styleUrls: ['./usuario-new-routed.component.css'],
})
export class UsuarioNewRoutedComponent implements OnInit {
  usuario: IUsuario2Send = null;
  id: number = 0;
  oForm: FormGroup = null;
  strResult: string = '';
  idnuevo: number;
  strEntity: string = "usuario"
  strOperation: string = "new"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    public oIconService: IconService,
    private oTipousuarioService: TipousuarioService
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string =
        this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      dni: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      user: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      tusuario: ['', [Validators.required, Validators.maxLength(1)]],

    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.usuario = {
        id: null,
        nombre: this.oForm.value.nombre,
        dni: this.oForm.value.dni,
        apellidos: this.oForm.value.apellido1,
        user: this.oForm.value.user,
        email: this.oForm.value.email,
        tipousuario:{
          id:this.oForm.value.tusuario
        }

      };
      this.new();
    }
  }

  new = (): void => {
    this.oUsuarioService
      .newOne(this.usuario)
      .subscribe((id: number) => {
        if (id) {
          this.id = id;
          this.strResult = 'El usuario se ha creado correctamente';
        } else {
          this.strResult = 'Error en la creación del registro';
        }
        this.openPopup();
      });
  };

  goBack(): void {
    this.oLocation.back();
  }
  //modal
  fila: IUserType;
  id_tipousuario: number = null;
  showingModal: boolean = false;
  dataToShow: IUserType = null;

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
    this.oForm.controls['tusuario'].setValue($event);
  }

  onChangeTUsuario($event: any) {

    console.log("--->" + this.oForm.controls['tusuario'].value);
    this.oForm.controls['tusuario'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModal) {
      this.closeModal();
    }

    //actualizar el tipo usuario
    this.oTipousuarioService
      .view(this.oForm.controls['tusuario'].value)
      .subscribe((oData: IUserType) => {
        this.dataToShow = oData;
        console.log(this.dataToShow)
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