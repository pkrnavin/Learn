import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStudentHistoryDetailsComponent } from './modal-student-history-details.component';

describe('ModalStudentHistoryDetailsComponent', () => {
  let component: ModalStudentHistoryDetailsComponent;
  let fixture: ComponentFixture<ModalStudentHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStudentHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStudentHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
