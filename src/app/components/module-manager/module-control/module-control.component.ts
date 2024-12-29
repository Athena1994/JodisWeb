import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ModuleMeta } from '../../../models/module-meta.interface';

@Component({
  selector: 'app-module-control',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './module-control.component.html',
  styleUrl: './module-control.component.css'
})
export class ModuleControlComponent {
  @Input({required: true}) module!: ModuleMeta;

}
