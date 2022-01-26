import { UserComponent } from './component/shared/routed/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { EditContrataComponent } from './component/application/routed/contrata/edit/edit-contrata.component';
import { NewContrataComponent } from './component/application/routed/contrata/new/new-contrata.component';
import { PlistContrataComponent } from './component/application/routed/contrata/plist/plist-contrata.component';
import { RemoveContrataComponent } from './component/application/routed/contrata/remove/remove-contrata.component';
import { ViewContrataComponent } from './component/application/routed/contrata/view/view-contrata.component';
import { EditFacturaComponent } from './component/application/routed/factura/edit/edit-factura.component';
import { NewFacturaComponent } from './component/application/routed/factura/new/new-factura.component';
import { FacturaPlistRoutedComponent } from './component/application/routed/factura/plist/factura-plist-routed.component';
import { RemoveFacturaComponent } from './component/application/routed/factura/remove/remove-factura.component';
import { ViewFacturaComponent } from './component/application/routed/factura/view/view-factura.component';
import { EditServicioComponent } from './component/application/routed/servicio/edit/edit-servicio.component';
import { NewServicioComponent } from './component/application/routed/servicio/new/new-servicio.component';
import { PlistServicioComponent } from './component/application/routed/servicio/plist/plist-servicio.component';
import { ServicioRemoveRoutedComponent } from './component/application/routed/servicio/remove/servicio-remove-routed.component';
import { ServicioViewRoutedComponent } from './component/application/routed/servicio/view/servicio-view-routed.component';
import { TipousuarioEditRoutedComponent } from './component/application/routed/tipousuario/edit/tipousuario-edit-routed.component';
import { TipousuarioPlistRoutedComponent } from './component/application/routed/tipousuario/plist/tipousuario-plist-routed.component';
import { TipousuarioViewRoutedComponent } from './component/application/routed/tipousuario/view/tipousuario-view-routed.component';
import { UsuarioEditRoutedComponent } from './component/application/routed/usuario/edit/usuario-edit-routed.component';
import { UsuarioNewRoutedComponent } from './component/application/routed/usuario/new/usuario-new-routed.component';
import { UsuarioPlistRoutedComponent } from './component/application/routed/usuario/plist/usuario-plist-routed.component';
import { UsuarioRemoveRoutedComponent } from './component/application/routed/usuario/remove/usuario-remove-routed.component';
import { UsuarioViewRoutedComponent } from './component/application/routed/usuario/view/usuario-view-routed.component';
import { ReportsComponent } from './component/shared/routed/reports/reports.component';
import { SessionResolver } from './resolve/session.resolve';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { message: SessionResolver } },

  { path: 'home', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'user', component: UserComponent, resolve: { message: SessionResolver } },
  { path: 'logout', component: LogoutComponent, resolve: { message: SessionResolver } },
  { path: 'reports', component: ReportsComponent, resolve: { message: SessionResolver } },

  { path: 'tipousuario/plist', component: TipousuarioPlistRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'tipousuario/view/:id', component: TipousuarioViewRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'tipousuario/edit/:id', component: TipousuarioEditRoutedComponent, resolve: { message: SessionResolver } },

  { path: 'usuario/plist', component: UsuarioPlistRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'usuario/plist/tipousuario/:id_tipousuario', component: UsuarioPlistRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'usuario/view/:id', component: UsuarioViewRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'usuario/new', component: UsuarioNewRoutedComponent, resolve: { message: SessionResolver } },  
  { path: 'usuario/edit/:id', component: UsuarioEditRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'usuario/remove/:id', component: UsuarioRemoveRoutedComponent, resolve: { message: SessionResolver } },

  { path: 'servicio/plist', component: PlistServicioComponent, resolve: { message: SessionResolver } },
  { path: 'servicio/plist/tiposervicio/:id_tiposervicio', component: PlistServicioComponent, resolve: { message: SessionResolver } },
  { path: 'servicio/view/:id', component: ServicioViewRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'servicio/new', component: NewServicioComponent, resolve: { message: SessionResolver } },  
  { path: 'servicio/edit/:id', component: EditServicioComponent, resolve: { message: SessionResolver } },
  { path: 'servicio/remove/:id', component: ServicioRemoveRoutedComponent, resolve: { message: SessionResolver } },

  { path: 'contrata/plist', component: PlistContrataComponent, resolve: { message: SessionResolver } },
  { path: 'contrata/plist/factura/:id_factura', component: PlistContrataComponent, resolve: { message: SessionResolver } },
  { path: 'contrata/plist/servicio/:id_servicio', component: PlistContrataComponent, resolve: { message: SessionResolver } },
  { path: 'contrata/view/:id', component: ViewContrataComponent, resolve: { message: SessionResolver } },  
  { path: 'contrata/new', component: NewContrataComponent, resolve: { message: SessionResolver } },  
  { path: 'contrata/edit/:id', component: EditContrataComponent, resolve: { message: SessionResolver } },
  { path: 'contrata/remove/:id', component: RemoveContrataComponent, resolve: { message: SessionResolver } },

  { path: 'factura/plist', component: FacturaPlistRoutedComponent, resolve: { message: SessionResolver } },
  { path: 'factura/plist/usuario/:id', component: FacturaPlistRoutedComponent, resolve: { message: SessionResolver } },  
  { path: 'factura/new', component: NewFacturaComponent, resolve: { message: SessionResolver } },
  { path: 'factura/view/:id', component: ViewFacturaComponent, resolve: { message: SessionResolver } },
  { path: 'factura/edit/:id', component: EditFacturaComponent, resolve: { message: SessionResolver } },
  { path: 'factura/remove/:id', component: RemoveFacturaComponent, resolve: { message: SessionResolver } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
