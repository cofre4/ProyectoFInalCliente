import { EditContrataComponent } from './edit-contrata.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('EditContrataComponent', () => {
  let component: EditContrataComponent;
  let fixture: ComponentFixture<EditContrataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContrataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
