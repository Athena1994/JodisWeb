import { Component, Directive, ElementRef, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { select, Store } from '@ngrx/store';
import { selectClients } from '../../../state/clients/clients.selectors';
import { clientActions } from '../../../state/clients/clients.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientControlPanelComponent } from '../client-control-panel.component';
import { UpdateService } from '../../../services/update.service';
import { clientProgressActions } from '../../../state/client-progress/client-progress.actions';

@Component({
  selector: 'app-client-overview',
  standalone: true,
  imports: [CommonModule, MatListModule, MatToolbarModule, MatCardModule,
    MatIconModule, MatDividerModule, MatButtonModule, MatTooltipModule,
    ClientControlPanelComponent
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
      this.store.dispatch(clientProgressActions.loadAll());
    }

}
