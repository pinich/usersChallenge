import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.entity';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input() origUser: User; // If in the future editing will be required
  user: User;

  constructor(private mainSrv: MainService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.user = { ...this.origUser };   // Make replication
  }

}
