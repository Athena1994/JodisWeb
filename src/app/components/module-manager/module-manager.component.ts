import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModuleControlComponent } from './module-control/module-control.component';
import { ModuleMeta } from '../../models/module-meta.interface';
import { MatButtonModule } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { selectModules, selectVersion } from '../../state/meta/meta.selectors';
import { metaActions } from '../../state/meta/meta.actions';



@Component({
  selector: 'app-module-manager',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, ModuleControlComponent, MatIconModule,
    MatButtonModule, CommonModule
  ],
  templateUrl: './module-manager.component.html',
  styleUrl: './module-manager.component.css'
})
export class ModuleManagerComponent {
  modules$ = this.store.pipe(select(selectModules))
  version$ = this.store.pipe(select(selectVersion))


  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(metaActions.loadModules());
    this.store.dispatch(metaActions.getServerVersion());
  }


  uploadModule(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      this.store.dispatch(metaActions.uploadModule({zip: file, overwrite: true}));
    }
  }
}
