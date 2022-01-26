import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioRemoveRoutedComponent } from './servicio-remove-routed.component';

describe('ServicioRemoveRoutedComponent', () => {
  let component: ServicioRemoveRoutedComponent;
  let fixture: ComponentFixture<ServicioRemoveRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioRemoveRoutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioRemoveRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
