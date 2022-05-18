import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {CallbackRoutingModule} from './callback-routing.module';
import {CallbackComponent} from './callback.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CallbackRoutingModule
  ],
  declarations: [CallbackComponent]
})
export class CallbackModule {}
