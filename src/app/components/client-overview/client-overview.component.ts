import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.interface';
import { ClientService } from '../../services/clients.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { selectClients } from '../../state/clients/clients.selectors';
import { clientActions } from '../../state/clients/clients.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { selectJobsByClientId, selectJobsByIds } from '../../state/jobs/jobs.selectors';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jobsActions } from '../../state/jobs/jobs.actions';
import { Job } from '../../models/job.interface';


@Component({
  selector: 'app-client-overview',
  standalone: true,
  imports: [CommonModule, MatListModule, MatToolbarModule, MatCardModule,
    MatIconModule, MatDividerModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './client-overview.component.html',
  styleUrl: './client-overview.component.css'
})

export class ClientOverviewComponent implements OnInit {
    clients$ = this.store.pipe(
      select(selectClients))

    getJobs(client: Client) {
      return this.store.pipe(select(selectJobsByClientId(client.id)));
    }

    deleteJob(job: Job) {
      this.store.dispatch(jobsActions.deleteJobs({ jobs: [job] }));
    }

    unassignJob(job: Job) {
      this.store.dispatch(jobsActions.assignJobs({ jobs: [job], client: null }));
    }

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.dispatch(clientActions.load());
    }

}
