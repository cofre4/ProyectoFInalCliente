import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPrint } from 'src/app/model/model-interfaces';
import { DateTimeService } from 'src/app/service/datetime.service';
import { IconService } from 'src/app/service/icon.service';

declare let $: any;

@Component({
  selector: 'app-preprint-unrouted',
  templateUrl: './preprint.component.html',
  styleUrls: ['./preprint.component.css']
})
export class PrePrintComponent implements OnInit {

  @Input() nombreinforme: string = "";
  @Input() showcantidad: boolean = true; //true=edición; false=selección
  @Input() showfechas: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();

  fechainicio: string;
  fechafin: string;
  oForm: FormGroup = null;
  oData2Send:IPrint=null;

  strOperation: string = "imprimir";
  strEntity: string = "informe";

  get f() { return this.oForm?.controls; }

  constructor(
    private oDateTimeService: DateTimeService,
    public oIconService: IconService,
    private oFormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.oForm = this.oFormBuilder.group({
      cantidad: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
    });
    $('#fechainicio').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fechainicio'].setValue(dateText);
        this.oForm.controls['fechainicio'].markAsDirty();
      }
    });
    $('#fechafin').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fechafin'].setValue(dateText);
        this.oForm.controls['fechafin'].markAsDirty();
      }
    });
  }


  onSubmit(): void {
    if (this.oForm) {
     
        if (this.showfechas && this.oForm.get("fechainicio")?.value > 0 && this.oForm.get("fechafin")?.value > 0) {
          this.oData2Send.fechainicial ="";
          this.oData2Send.fechafinal ="";
          //this.selection.emit(oData2Send);
        }
      
    }
  }
}