import { ViewContrataComponent } from './view-contrata.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ViewContrataComponent', () => {
  let component: ViewContrataComponent;
  let fixture: ComponentFixture<ViewContrataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContrataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
