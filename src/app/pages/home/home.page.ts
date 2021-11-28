import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'hbz-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private readonly navController: NavController) {}

  async goToInfo() {
    await this.navController.navigateForward('/info');
  }
}
