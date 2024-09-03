import { Component, NgModule } from '@angular/core';
import { Job } from '../../models/job.interface';
import { select, Store } from '@ngrx/store';
import { selectUnassignedJobs } from '../../state/jobs/jobs.selectors';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { jobsActions } from '../../state/jobs/jobs.actions';
import { MatSelectModule } from '@angular/material/select';
import { selectClients } from '../../state/clients/clients.selectors';
import { Client } from '../../models/client.interface';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-unassigned-jobs-control',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
            MatButtonModule, MatSelectModule, FormsModule, MatListModule,
          MatCardModule],
  templateUrl: './unassigned-jobs-control.component.html',
  styleUrl: './unassigned-jobs-control.component.css'
})
export class UnassignedJobsControlComponent {
  jobs: Job[] = [];
  selected: Job[] = [];

  clients$ = this.store.pipe(select(selectClients));

  selectedClient: Client | null = null;

  constructor(private store: Store) {
  }

  assignJobs() {
    this.store.dispatch(jobsActions.assignJobs(
      { jobs: this.selected, client: this.selectedClient }));
  }

  deleteJob(job: Job) {
    this.store.dispatch(jobsActions.deleteJobs({ jobs: [job] }));
  }

  updateSelection(job: Job, selected: boolean) {
    if (selected) {
      this.selected.push(job);
    } else {
      this.selected = this.selected.filter(j => j !== job);
    }
  }

  changeClientSelection(client: Client){
    console.log(this.selectedClient);
  }

  ngOnInit() {
      this.store.pipe(select(selectUnassignedJobs)).subscribe((jobs) => {
        this.jobs = jobs;
        this.selected = this.selected.filter(j => jobs.includes(j));
      });
  }
}
