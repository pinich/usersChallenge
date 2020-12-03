import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user.entity';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${JSON.stringify(reason)}`;
    }
  }

  async openModal() {
    const modalRef = this.modalService.open(UserModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.origUser = this.user;
    let res;
    try {
      res = await modalRef.result;
    } catch (dismissReason) {
      res = this.getDismissReason(dismissReason);
    }
  }

}
