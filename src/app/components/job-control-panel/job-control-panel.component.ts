import { Component } from '@angular/core';
import { ClientOverviewComponent } from "../client-control-panel/client-overview/client-overview.component";
import { JobOverviewComponent } from "./job-overview/job-overview.component";
import { JobCreatorComponent } from "./job-creator/job-creator.component";
import { UnassignedJobsControlComponent } from "./unassigned-jobs-control/unassigned-jobs-control.component";

@Component({
  selector: 'app-job-control-panel',
  standalone: true,
  imports: [ClientOverviewComponent, JobOverviewComponent, JobCreatorComponent, UnassignedJobsControlComponent],
  templateUrl: './job-control-panel.component.html',
  styleUrl: './job-control-panel.component.css'
})
export class JobControlPanelComponent {

}
