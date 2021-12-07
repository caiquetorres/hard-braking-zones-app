import { Component, OnInit } from '@angular/core';

import { IInfo } from '../../models/proxies/info.interface';

import { AlertService } from '../../services/alert/alert.service';
import { InfoService } from '../../services/info/info.service';
import { VersionService } from '../../services/version/version.service';

import { environment } from '../../../environments/environment';

/**
 * Component that represents the application home page.
 */
@Component({
  selector: 'hbz-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  /**
   * Property that says if the page data is loading or not.
   */
  loading: boolean;

  /**
   * Property that defines an object that represents the data that will
   * be rendered.
   */
  info: IInfo;

  speed = 0;

  constructor(
    private readonly versionService: VersionService,
    private readonly infoService: InfoService,
    private readonly alertService: AlertService,
  ) {}

  async ngOnInit() {
    this.loading = true;

    this.info = await this.fetchInfo();
    const {
      value: { version },
    } = await this.versionService.getOne();

    if (version !== environment.version) {
      await this.alertService.present({
        header: 'Nova versão',
        message: `Uma nova versão do app foi encontrada, deseja baixa-la?`,
        buttons: [
          'Cancelar',
          {
            text: 'Fazer download',
            handler: async () => {
              console.log('dowload');
            },
          },
        ],
      });
    }

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
