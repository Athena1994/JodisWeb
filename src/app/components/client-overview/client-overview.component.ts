import { Component, Directive, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../models/client.interface';
import { ClientService } from '../../services/clients.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { selectClients } from '../../state/clients/clients.selectors';
import { clientActions } from '../../state/clients/clients.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { selectActiveClientJob, selectScheduledJobsByClientId } from '../../state/jobs/jobs.selectors';
import { first, map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jobsActions } from '../../state/jobs/jobs.actions';
import { Job } from '../../models/job.interface';
import { interval, Observable, of } from 'rxjs';
import { ClientControlComponent } from '../client-control/client-control.component';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-client-overview',
  standalone: true,
  imports: [CommonModule, MatListModule, MatToolbarModule, MatCardModule,
    MatIconModule, MatDividerModule, MatButtonModule, MatTooltipModule,
    ClientControlComponent
  ],
  templateUrl: './client-overview.component.html',
  styleUrl: './client-overview.component.css'
})

export class ClientOverviewComponent implements OnInit {
    clients$ = this.store.pipe(select(selectClients))

    constructor(private store: Store,
                private updateService: UpdateService
    ) {}

    ngOnInit() {
      this.store.dispatch(clientActions.load());
    }

}
