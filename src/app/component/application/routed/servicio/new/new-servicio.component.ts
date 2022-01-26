import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { IServicio, IServicio2Send } from 'src/app/model/servicio-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
declare let $: any;

@Component({
  selector: 'app-new-servicio',
  templateUrl: './new-servicio.component.html',
  styleUrls: ['./new-servicio.component.css'],
})
export class NewServicioComponent implements OnInit {
  strEntity: string = 'servicio';
  strOperation: string = 'new';
  strTitleSingular: string = 'Servicio';
  strTitlePlural: string = 'Servicios';
  oProduct2Send: IServicio2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oServicioService: ServicioService,
    private oLocation: Location,
    public oIconService: IconService
  ) {
    if (this.oRoute.snapshot.data.message) {
     this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oUserSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', Validators.required],
      existencias: [''],
      precio: [''],
      imagen: [''],
      descuento: [''],
      tiposervicio: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oProduct2Send = {
        id: null,
        nombre: this.oForm.value.nombre,
        descripcion: this.oForm.value.descripcion,
        precio: this.oForm.value.precio,
        
      };
      this.new();
    }
  }

  new = (): void => {
    this.oServicioService
      .newOne(this.oProduct2Send)
      .subscribe((oProduct: IServicio) => {
        console.log('dentro de new');
        if (oProduct.id) {
          this.id = oProduct.id;
          console.log('El servicio se ha creado correctamente');
          this.strResult = 'El servicio se ha creado correctamente';
        } else {
          this.strResult = 'Error en la creación del registro';
        }
        this.openPopup();
      });
  };

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
