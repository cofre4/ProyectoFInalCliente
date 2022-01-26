import { IServicio, IServicio2Send } from '../../../../../model/servicio-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';

declare let $: any;

@Component({
  selector: 'app-edit-servicio',
  templateUrl: './edit-servicio.component.html',
  styleUrls: ['./edit-servicio.component.css']
})
export class EditServicioComponent implements OnInit {

  strEntity: string = "servicio"
  strOperation: string = "edit"
  strTitleSingular: string = "Servicio";
  strTitlePlural: string = "Servicios";
  oServicio2Send: IServicio2Send = null;
  oServicio2Show: IServicio = null;
  oForm: FormGroup = null;
  id: number = null;
  strResult: string = null;
  oUserSession: IUsuario;

  //selectedFile: ImageSnippet;
  //previewImage:any;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oServicioService: ServicioService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    private oRoute: ActivatedRoute,
    public oIconService: IconService
  ) {

    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();

  }

  ngOnInit(): void { }

  getOne = (): void => {
    this.oServicioService.get(this.id).subscribe((oData: IServicio) => {
      this.oServicio2Show = oData;
      this.oForm = this.oFormBuilder.group({
        id: [this.oServicio2Show.id],
        nombre: [this.oServicio2Show.nombre, [Validators.required, Validators.minLength(5)],],
        existencias: this.oServicio2Show.descripcion,
        precio: this.oServicio2Show.precio,
      });
    });
  };


  processFile($event: any) {
    const reader = new FileReader();

    if ($event.target.files && $event.target.files.length) {
      this.selectedFiles = $event.target.files;      
      if (this.selectedFiles) {
        this.file2Send = this.selectedFiles.item(0);
        this.selectedFile = this.file2Send.name;
        if (this.file2Send) {
          reader.readAsDataURL(this.file2Send);
          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.oForm.controls['imagen'].markAsDirty();
            //this.oForm.patchValue({
            //  imagen: reader.result
            //});

          };
        }
      }
    }
  }

  selectedFiles?: FileList;
  imageSrc: string = null;
  file2Send: File = null;
  selectedFile:string;

  onSubmit(): void {
        
    console.log("-->nombre: " , this.selectedFile);
    //const file: File = imageInput.files[0];
    //this.selectedFile = new ImageSnippet(  this.idisc_appmageSrc , file);
    //this.oFileService.uploadImage(this.file2Send).subscribe(
      //(serverResponse) => {
        if (this.oForm) {
          this.oServicio2Send = {
            id: this.id,
            nombre: this.oForm.value.nombre,
            descripcion: this.oForm.value.descripcion,
            precio: this.oForm.value.precio,
          }
          console.log(this.oServicio2Send)
          this.oServicioService
            .update(this.oServicio2Send)
            .subscribe((oServicio: IServicio) => {
              if (oServicio.id) {
                this.strResult = this.strTitleSingular + ' modificado correctamente';
              } else {
                this.strResult = this.strTitleSingular + ': error en la modificación del registro';
              }
              this.openPopup();
            });
        }
     // },
      //(err) => {
        //this.strResult = this.strTitleSingular + 'Error al cambiar el registro: ' + err.error.message;
        //console.log("Upload error:", err.error.message);
        //this.openPopup();
      //})

  }

  update = (): void => {

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
