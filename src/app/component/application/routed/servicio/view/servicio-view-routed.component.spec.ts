import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioViewRoutedComponent } from './servicio-view-routed.component';

describe('ServicioViewRoutedComponent', () => {
  let component: ServicioViewRoutedComponent;
  let fixture: ComponentFixture<ServicioViewRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioViewRoutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioViewRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
