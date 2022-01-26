import { PlistContrataComponent } from './plist-contrata.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PlistContrataComponent', () => {
  let component: PlistContrataComponent;
  let fixture: ComponentFixture<PlistContrataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistContrataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlistContrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
