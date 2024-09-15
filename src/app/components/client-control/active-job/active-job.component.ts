import { Component, Input } from '@angular/core';
import { Job } from '../../../models/job.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { clientActions } from '../../../state/clients/clients.actions';
import { Client } from '../../../models/client.interface';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-active-job',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatIconModule, MatButtonModule,
    MatExpansionModule, MatProgressBarModule, MatCardModule
  ],
  templateUrl: './active-job.component.html',
  styleUrl: './active-job.component.css'
})
export class ActiveJobComponent {
  @Input({required: true}) job!: Job | null;
  @Input({required: true}) client!: Client;
  @Input({required: true}) allowRequests!: boolean;

  cancelJob(job: Job) {
    if(confirm("Are you sure you want to cancel this job?")) {
          this.store.dispatch(
            clientActions.sendClientRequest({
              client: this.client,
              cmd: "cancel_job",
              value: {job_id: job.id}}));
    }
  }

  pauseJob(job: Job) {
    this.store.dispatch(
      clientActions.sendClientRequest({
        client: this.client,
        cmd: "pause_job",
        value: {job_id: job.id}}));
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
