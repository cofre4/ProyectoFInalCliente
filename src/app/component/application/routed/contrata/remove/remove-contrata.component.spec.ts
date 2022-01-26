import { RemoveContrataComponent } from './remove-contrata.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('RemoveContrataComponent', () => {
  let component: RemoveContrataComponent;
  let fixture: ComponentFixture<RemoveContrataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveContrataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveContrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
