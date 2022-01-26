import { PaginationService } from './service/pagination.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/shared/routed/user/user.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { MenuComponent } from './component/shared/unrouted/menu/menu.component';
import { SessionService } from './service/session.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionResolver } from './resolve/session.resolve';
import { PostService } from './service/post.service';
import { TrimPipe } from './pipe/trim.pipe';
import { showDateTimePipe } from './pipe/showDateTime.pipe';
import { FooterComponent } from './component/shared/unrouted/footer/footer.component';
import { showBooleanPipe } from './pipe/showBoolean.pipe';
import { ModalComponent } from './component/shared/unrouted/modal/modal.component';
import { DateTimeService } from './service/datetime.service';
import { HeaderComponent } from './component/shared/unrouted/header/header.component';
import { TipousuarioPlistRoutedComponent } from './component/application/routed/tipousuario/plist/tipousuario-plist-routed.component';
import { TipousuarioEditRoutedComponent } from './component/application/routed/tipousuario/edit/tipousuario-edit-routed.component';
import { TipousuarioViewRoutedComponent } from './component/application/routed/tipousuario/view/tipousuario-view-routed.component';
import { PlistServicioComponent } from './component/application/routed/servicio/plist/plist-servicio.component';
import { NewServicioComponent } from './component/application/routed/servicio/new/new-servicio.component';
import { EditServicioComponent } from './component/application/routed/servicio/edit/edit-servicio.component';
import { ServicioRemoveRoutedComponent } from './component/application/routed/servicio/remove/servicio-remove-routed.component';
import { ServicioViewRoutedComponent } from './component/application/routed/servicio/view/servicio-view-routed.component';
import { UsuarioPlistRoutedComponent } from './component/application/routed/usuario/plist/usuario-plist-routed.component';
import { UsuarioNewRoutedComponent } from './component/application/routed/usuario/new/usuario-new-routed.component';
import { UsuarioEditRoutedComponent } from './component/application/routed/usuario/edit/usuario-edit-routed.component';
import { UsuarioRemoveRoutedComponent } from './component/application/routed/usuario/remove/usuario-remove-routed.component';
import { UsuarioViewRoutedComponent } from './component/application/routed/usuario/view/usuario-view-routed.component';
import { PlistContrataComponent } from './component/application/routed/contrata/plist/plist-contrata.component';
import { NewContrataComponent } from './component/application/routed/contrata/new/new-contrata.component';
import { ViewContrataComponent } from './component/application/routed/contrata/view/view-contrata.component';
import { RemoveContrataComponent } from './component/application/routed/contrata/remove/remove-contrata.component';
import { EditContrataComponent } from './component/application/routed/contrata/edit/edit-contrata.component';
import { FacturaPlistRoutedComponent } from './component/application/routed/factura/plist/factura-plist-routed.component';
import { NewFacturaComponent } from './component/application/routed/factura/new/new-factura.component';
import { ViewFacturaComponent } from './component/application/routed/factura/view/view-factura.component';
import { RemoveFacturaComponent } from './component/application/routed/factura/remove/remove-factura.component';
import { EditFacturaComponent } from './component/application/routed/factura/edit/edit-factura.component';
import { ContrataService } from './service/contrata.service';
import { ServicioService } from './service/servicio.service';
import { UsuarioService } from './service/usuario.service';
import { TipousuarioService } from './service/tipousuario.service';
import { FacturaService } from './service/factura.service';
import { IconService } from './service/icon.service';
import { CountService } from './service/count.service';
import { ReportsComponent } from './component/shared/routed/reports/reports.component';
import { UsuarioPlistUnroutedComponent } from './component/application/unrouted/usuario/plist/usuario-plist-unrouted.component';
import { PopupComponent } from './component/shared/unrouted/popup/popup.component';
import { UsuarioViewUnroutedComponent } from './component/application/unrouted/usuario/view/usuario-view-unrouted.component';
import { PrePrintComponent } from './component/shared/unrouted/preprint/preprint.component';
import { ServicioPlistUnroutedComponent } from './component/application/unrouted/servicio/plist/servicio-plist-unrouted.component';

import { FacturaPlistUnroutedComponent } from './component/application/unrouted/factura/plist/factura-plist-unrouted.component';
import { TipousuarioPlistUnroutedComponent } from './component/application/unrouted/tipousuario/plist/tipousuario-plist-unrouted.component';
import { ServicioCPlistUnroutedComponent } from './component/application/unrouted/servicio/cplist/servicio-cplist-unrouted.component';

@NgModule({
  declarations: [
    AppComponent,
    // shared unrouted
    ModalComponent,
    PopupComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PrePrintComponent,
    // shared routed
    UserComponent,
    HomeComponent,
    LogoutComponent,
    ReportsComponent,
    // pipes
    TrimPipe,
    showDateTimePipe,
    showBooleanPipe,
    // Tipousuario routed components
    TipousuarioPlistRoutedComponent,
    TipousuarioViewRoutedComponent,
    TipousuarioEditRoutedComponent,
    // Usuario routed components
    UsuarioPlistRoutedComponent,
    UsuarioViewRoutedComponent,
    UsuarioNewRoutedComponent,
    UsuarioEditRoutedComponent,
    UsuarioRemoveRoutedComponent,
   
    // Servicio routed components
    PlistServicioComponent,
    ServicioViewRoutedComponent,
    NewServicioComponent,
    EditServicioComponent,
    ServicioRemoveRoutedComponent,
    // Contrata routed components
    PlistContrataComponent,
    ViewContrataComponent,
    NewContrataComponent,
    EditContrataComponent,
    RemoveContrataComponent,
    // Factura routed components
    FacturaPlistRoutedComponent,
    ViewFacturaComponent,
    NewFacturaComponent,
    EditFacturaComponent,
    RemoveFacturaComponent,

    // Usuario unrouted components
    UsuarioPlistUnroutedComponent,
    UsuarioViewUnroutedComponent,

    // Servicio unrouted components
    ServicioPlistUnroutedComponent,

    // Factura unrouted components
    FacturaPlistUnroutedComponent,

    // TipoUsuario unrouted components
    TipousuarioPlistUnroutedComponent,

    ServicioCPlistUnroutedComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SessionService,
    SessionResolver,
    PostService,
    PaginationService,
    DateTimeService,
    ContrataService,
    FacturaService,
    ServicioService,
    UsuarioService,
    TipousuarioService,
    IconService,
    CountService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
