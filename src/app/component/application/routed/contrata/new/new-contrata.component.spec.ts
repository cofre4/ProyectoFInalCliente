import { NewContrataComponent } from './new-contrata.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NewContrataComponent', () => {
  let component: NewContrataComponent;
  let fixture: ComponentFixture<NewContrataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContrataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
