import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.entity';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private usersSub: Subscription;
  users: User[];
  isLoading = false;
  constructor(private mainSrv: MainService) { }

  ngOnInit(): void {
    this.usersSub = this.mainSrv.users.subscribe(fetchedUsers => this.users = fetchedUsers);
    this.isLoading = true;
    this.mainSrv.getUsersList().subscribe(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe()
    }
  }
}
