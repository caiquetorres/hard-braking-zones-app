import { NgModule } from '@angular/core';

import { CountUpPipe } from './count-up.pipe';

@NgModule({
  declarations: [CountUpPipe],
  exports: [CountUpPipe],
})
export class CountUpModule {}
