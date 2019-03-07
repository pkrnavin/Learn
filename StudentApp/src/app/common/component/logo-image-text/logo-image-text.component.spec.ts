import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoImageTextComponent } from './logo-image-text.component';

describe('LogoImageTextComponent', () => {
  let component: LogoImageTextComponent;
  let fixture: ComponentFixture<LogoImageTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoImageTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
