import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgOperationComponent } from './img-operation.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from '../../../../module/primeng.module';
@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
  ],
  declarations: [ImgOperationComponent],
  exports: [ImgOperationComponent]
})
export class ImgOperationModule { }
