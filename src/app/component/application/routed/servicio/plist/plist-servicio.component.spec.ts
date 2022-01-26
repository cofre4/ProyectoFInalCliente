import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistServicioComponent } from './plist-servicio.component';

describe('PlistServicioComponent', () => {
  let component: PlistServicioComponent;
  let fixture: ComponentFixture<PlistServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlistServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
