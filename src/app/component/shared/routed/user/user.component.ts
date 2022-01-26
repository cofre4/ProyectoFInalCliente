import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { CryptoService } from 'src/app/service/crypto.service';
import { IconService } from 'src/app/service/icon.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  strOperation: string = "user"
  formularioUser: FormGroup;
  oUserSession: IUsuario;

  constructor(
    private FormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService,
    private oCryptoService: CryptoService,
    public oIconService: IconService    
  ) {

    if (oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(oRoute.snapshot.data.message));
      oRouter.navigate(['/home']);
    } else {
      localStorage.clear();
    }

    this.formularioUser = <FormGroup>this.FormBuilder.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void { }

  onSubmit() {
    const userData = { user: this.formularioUser.get('user')!.value, password: this.oCryptoService.getSHA256(this.formularioUser.get('password')!.value) };
    console.log("user:onSubmit: ", userData);
    this.oSessionService.user(JSON.stringify(userData)).subscribe(data => {
      localStorage.setItem("user", JSON.stringify(data.toString()));
      if (data != null) {
        this.oRouter.navigate(['/home']);
      } else {
        localStorage.clear();
      }
    });
    return false;
  }

  userAdmin() {
    this.formularioUser.setValue({
      user: "admin",
      password: "wildcart"
    })
  }

  userUser() {
    this.formularioUser.setValue({
      user: "user",
      password: "wildcart"
    })
  }

}
