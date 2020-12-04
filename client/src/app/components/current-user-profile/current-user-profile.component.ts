import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/loginUser.entity';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Utils } from 'src/app/_helpers/utils';

@Component({
  selector: 'app-current-user-profile',
  templateUrl: './current-user-profile.component.html',
  styleUrls: ['./current-user-profile.component.css'],
})
export class CurrentUserProfileComponent implements OnInit {
  currentUser: LoginUser;
  tokenExpDateStr: string;
  registrationDateStr: string;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.registrationDateStr = Utils.timeStampToDateInput(
      this.currentUser.date + ''
    );
    this.tokenExpDateStr = Utils.timeStampToDateInput(
      new Date(this.currentUser.tokenExpDate * 1000).toISOString()
    );
  }
}
