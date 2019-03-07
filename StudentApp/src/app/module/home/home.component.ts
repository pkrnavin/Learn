import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/service/userService/user.service';
import { StudentService } from '../student-details/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  homeGridLinks: any = [
		{ column_1: { link: '/user/studentDetails', text: 'Student Details' }, column_2: { link: '/testPathParam/123', text: 'TestPathParam' }, column_3: { link: '/testPathParam/456', text: 'TestPathParam' } },
		{ column_1: { link: '/testPathParam/111', text: 'TestPathParam' }, column_2: { link: '/testPathParam/222', text: 'TestPathParam' }, column_3: { link: '/testPathParam/333', text: 'TestPathParam' } },
		{ column_1: { link: '/testRouteChild/123', text: 'TestRouteChild' }, column_2: { link: '/testRouteChild/456', text: 'TestRouteChild' }, column_3: { link: '/testRouteChild/789', text: 'TestRouteChild' } }
	];

  constructor(private userService: UserService, private studentService: StudentService) { }

  /**
   * to load page refresh, of user session exists, to in page, else to redirect `/login` 
   */
  ngOnInit() {
    //this.userService.getLoginUserDetails();
  }

  /**
   * to load user details 
   */
  loadUserDetails(): void {
    this.userService.getLoginUserDetails();
  };
  
  /**
   * get student details, 
   * to checking resp err `SESSION_EXPIRED` redirect to `login` to checking to try 
   */
  getStudentDetails(): void {
    this.studentService.getUserStudentDetails(184).subscribe(resp => {
      console.info('resp: '+JSON.stringify(resp));
    });
  };
}
