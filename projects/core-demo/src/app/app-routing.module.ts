import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'input',
    loadChildren: () => import('./stories/input/input-demo.module').then(m => m.InputDemoModule),
  },
  {
    path: 'buttons',
    loadChildren: () => import('./stories/buttons/buttons-demo.module').then(m => m.ButtonsDemoModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
