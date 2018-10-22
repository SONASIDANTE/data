import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {AuthService} from '../../../../service/auth.service';
@Component({
  selector: 'app-h-tree',
  templateUrl: './h-tree.component.html',
  styleUrls: ['./h-tree.component.css']
})
export class HTreeComponent implements OnInit {
  @Input() parentId = 0;
  @Input() list = [];
  @Input() last = false;
  @Input() level = 0;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() add = new EventEmitter();
  account_auth = [];
  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }
  deleteDepartment(id, name) {
    this.delete.emit({id: id, parentId: this.parentId, name: name});
  }
  editDepartment(id, name) {
    this.edit.emit({id: id, parentId: this.parentId, name: name});
  }
  addDepartment(id) {
    this.add.emit({parentId: id});
  }
  editListen(event) {
    this.edit.emit(event);
  }
  deleteListen(event) {
    this.delete.emit(event);
  }
  addListen(event) {
    this.add.emit(event);
  }
}
