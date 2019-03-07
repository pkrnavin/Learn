import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChildSpecsComponent } from './test-child-specs.component';

describe('TestChildSpecsComponent', () => {
  let component: TestChildSpecsComponent;
  let fixture: ComponentFixture<TestChildSpecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChildSpecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChildSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
