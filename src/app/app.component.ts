import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ClientOverviewComponent } from './components/client-overview/client-overview.component';
import { JobOverviewComponent } from './components/job-overview/job-overview.component';
import { JobCreatorComponent } from './components/job-creator/job-creator.component';
import { UnassignedJobsControlComponent } from './components/unassigned-jobs-control/unassigned-jobs-control.component';
import { ModuleManagerComponent } from "./components/module-manager/module-manager.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientOverviewComponent, JobOverviewComponent,
    JobCreatorComponent, UnassignedJobsControlComponent, ModuleManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TradingWeb';
}
