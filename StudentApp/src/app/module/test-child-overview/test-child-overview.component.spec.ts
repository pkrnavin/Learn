import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChildOverviewComponent } from './test-child-overview.component';

describe('TestChildOverviewComponent', () => {
  let component: TestChildOverviewComponent;
  let fixture: ComponentFixture<TestChildOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChildOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChildOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
