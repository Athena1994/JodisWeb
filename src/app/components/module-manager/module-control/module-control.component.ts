import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ModuleMeta } from '../../../models/module-meta.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { VersionOverviewComponent } from './version-overview/version-overview.component';
import { metaActions } from '../../../state/meta/meta.actions';

@Component({
  selector: 'app-module-control',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatToolbarModule, MatFormFieldModule,
    MatInputModule, CommonModule, FormsModule, MatButtonModule, MatSelectModule,
    VersionOverviewComponent
  ],
  templateUrl: './module-control.component.html',
  styleUrl: './module-control.component.css'
})
export class ModuleControlComponent {
  @Input({required: true}) module!: ModuleMeta;


  constructor(private store: Store) {
  }

  hasError(): boolean {
    return this.module.error !== undefined && this.module.error !== null && this.module.error.length > 0;
  }

  reloadModule() {
    this.store.dispatch(metaActions.reloadModule({moduleName: this.module.name}));
  }

}
