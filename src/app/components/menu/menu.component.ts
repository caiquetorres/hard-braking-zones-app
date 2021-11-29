import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

/**
 * Component that represents the main application menu.
 */
@Component({
  selector: 'hbz-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuComponent {
  constructor(
    private readonly navController: NavController,
    private readonly menuController: MenuController,
  ) {}

  /**
   * Method that redirects the user to the home page.
   */
  async goToHome() {
    await this.menuController.close();
    return this.navController.navigateRoot('/home');
  }
}
