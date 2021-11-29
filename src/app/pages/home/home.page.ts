import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

/**
 * Component that represents the application home page.
 */
@Component({
  selector: 'hbz-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private readonly navController: NavController) {}

  /**
   * Method that redirects the user to the info page.
   */
  async goToInfo() {
    await this.navController.navigateForward('/info');
  }
}
