import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfigValidationService } from '../../services/configValidation.service';
import { select, Store } from '@ngrx/store';
import { newJobActions } from '../../state/new-job/new-job.actions';
import { hasValidConfig, isCreating, isReadyToCreate, isValidating, selectConfig, selectDescription, selectError, selectName, selectStatus } from '../../state/new-job/new-job.selectors';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Directive({
  selector: '[containerSizeCheck]',
  standalone: true
})
export class ContainerSizeCheckDirective {
  @Input('showLabel') showLabel: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const container = this.elementRef.nativeElement;
    const containerWidth = container.getBoundingClientRect().width;

    // Adjust the threshold as needed
    this.showLabel = containerWidth > 300; // Show label if container width is greater than 300 pixels
  }
}


@Component({
  selector: 'app-job-creator',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, CommonModule,
    MatProgressSpinnerModule, FormsModule, MatToolbarModule, MatCardModule,
    MatButtonModule, MatTooltipModule, ContainerSizeCheckDirective
  ],
  templateUrl: './job-creator.component.html',
  styleUrl: './job-creator.component.css'
})
export class JobCreatorComponent {

  @ViewChild("nameField", {static: true})
  nameField!: MatFormFieldModule;

  @ViewChild("descriptionField", {static: true})
  descriptionField!: MatFormFieldModule;

  createEnabled$ = this.store.pipe(select(isReadyToCreate));
  error$ = this.store.pipe(select(selectError));
  status$ = this.store.pipe(select(selectStatus));

  name$ = this.store.pipe(select(selectName));
  description$ = this.store.pipe(select(selectDescription));

  validationFailed$ = this.store.pipe(select(selectStatus)).pipe(
    map(status => status === 'error')
  );
  isValidating$ = this.store.pipe(select(isValidating));
  isCreating$ = this.store.pipe(select(isCreating))
  validConfig$ = this.store.pipe(select(hasValidConfig));

  componentDisabled$ = this.status$.pipe(
    map(status => status !== 'idle')
  );


  spinnerText$ = this.store.pipe(select(selectStatus)).pipe(
    map(status => {
      switch (status) {
        case 'validating':
          return 'Validating config...';
        case 'creating':
          return 'Creating job...';
        default:
          return '';
      }
    })
  );

  onNameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.store.dispatch(newJobActions.setName({ name: target.value }));
  }

  onDescriptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.store.dispatch(newJobActions.setDescription(
      { description: target.value }));
  }

  createJob() {
      this.store.dispatch(newJobActions.createJob());
  }

  async onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        this.store.dispatch(newJobActions.validateConfig(
          { config: await file.text() }));
    }
  }

  constructor(private store: Store) {
  }


}
