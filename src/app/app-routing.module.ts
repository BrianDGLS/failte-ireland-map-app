import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultViewComponent } from './default-view/default-view.component';

const routes: Routes = [
  { path: '', component: DefaultViewComponent },
  { path: '**', component: DefaultViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
