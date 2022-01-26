import { UsuarioPlistUnroutedComponent } from './../../usuario/plist/usuario-plist-unrouted.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';



describe('UsuarioPlistComponent', () => {
  let component: UsuarioPlistUnroutedComponent;
  let fixture: ComponentFixture<UsuarioPlistUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPlistUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
