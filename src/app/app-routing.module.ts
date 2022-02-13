import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./pages/feedback/feedback.module').then(
        (m) => m.FeedbackPageModule,
      ),
  },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./pages/settings/settings.module').then(
  //       (m) => m.SettingsPageModule,
  //     ),
  // },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
