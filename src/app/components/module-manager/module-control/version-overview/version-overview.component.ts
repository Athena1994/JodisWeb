import { Component, Input } from '@angular/core';
import { VersionMeta } from '../../../../models/version-meta';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-version-overview',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './version-overview.component.html',
  styleUrl: './version-overview.component.css'
})
export class VersionOverviewComponent {
  @Input({required: true}) version!: VersionMeta;



}
