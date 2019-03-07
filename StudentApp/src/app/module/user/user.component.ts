import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/service/userService/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  /**
   * loginUserDetails loads page refresh, to calls, to adds 
   * - (1) to loads login UserDetails page refresh  
   */
  ngOnInit() {
    //this.userService.getLoginUserDetails(); // (1)
  }
  

}
