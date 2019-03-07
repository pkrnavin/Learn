import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRouteChildComponent } from './test-route-child.component';

describe('TestRouteChildComponent', () => {
  let component: TestRouteChildComponent;
  let fixture: ComponentFixture<TestRouteChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRouteChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRouteChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
