import { RouterModule, Routes } from '@angular/router';

import { JobControlPanelComponent } from './components/job-control-panel/job-control-panel.component';
import { NgModule } from '@angular/core';
import { ModuleManagerComponent } from './components/module-manager/module-manager.component';

export const routes: Routes = [
    { path: '', component: JobControlPanelComponent },
    { path: 'modules', component: ModuleManagerComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }