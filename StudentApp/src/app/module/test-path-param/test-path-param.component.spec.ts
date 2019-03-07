import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPathParamComponent } from './test-path-param.component';

describe('TestPathParamComponent', () => {
  let component: TestPathParamComponent;
  let fixture: ComponentFixture<TestPathParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPathParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPathParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
