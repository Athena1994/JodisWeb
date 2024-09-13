import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Client } from '../../models/client.interface';
import { map, Observable, of } from 'rxjs';
import { Job } from '../../models/job.interface';
import { selectActiveClientJob, selectScheduledJobsByClientId } from '../../state/jobs/jobs.selectors';
import { jobsActions } from '../../state/jobs/jobs.actions';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { clientActions } from '../../state/clients/clients.actions';
import { selectActionPending } from '../../state/clients/clients.selectors';

@Component({
  selector: 'app-client-control',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatToolbarModule, MatIconModule,
    MatButtonModule, MatTooltipModule
  ],
  templateUrl: './client-control.component.html',
  styleUrl: './client-control.component.css'
})

export class ClientControlComponent {


  @Input({required: true}) client!: Client;

  actionPending$ = this.store.pipe(select(selectActionPending));

  scheduledJobs$!: Observable<Job[]>;
  activeJob$!: Observable<Job | null>;

    cancelJob(_t32: Job) {
      if(confirm("Are you sure you want to cancel this job?")) {
      }
    }

    pauseJob(_t32: Job) {

    }

    requestStateChange(active: boolean) {
      this.store.dispatch(clientActions.requestStateChange({ client: this.client, active }));
    }

    deleteJob(job: Job) {
      this.store.dispatch(jobsActions.deleteJobs({ jobs: [job] }));
    }

    unassignJob(job: Job) {
      this.store.dispatch(jobsActions.assignJobs({ jobs: [job], client: null }));
    }

    constructor(private store: Store) { }

    ngOnInit(): void {
      this.scheduledJobs$
        = this.store.pipe(select(selectScheduledJobsByClientId(this.client.id)));

      this.activeJob$ = this.store.pipe(
        select(selectActiveClientJob(this.client.id)),
        map((jobs: Job[]) => jobs.length != 0 ? jobs[0] : null)
      );

    }

}
