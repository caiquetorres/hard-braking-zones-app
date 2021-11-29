import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuModule {}
