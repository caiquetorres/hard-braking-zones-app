import { Component, OnInit } from '@angular/core';

import { IInfo } from '../../models/proxies/info.interface';

import { InfoService } from '../../services/info/info.service';

/**
 * Component that represents the application information page.
 */
@Component({
  selector: 'hbz-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  /**
   * Property that says if the page data is loading or not.
   */
  loading: boolean;

  /**
   * Property that defines an object that represents the data that will
   * be rendered.
   */
  info: IInfo;

  constructor(private readonly infoService: InfoService) {}

  async ngOnInit() {
    this.loading = true;
    this.info = await this.fetchInfo();
    this.loading = false;
  }

  /**
   * Method that gets from the backend the default entity value.
   *
   * @returns an object that represents the found entity.
   */
  private async fetchInfo() {
    return this.infoService.getDefault();
  }
}