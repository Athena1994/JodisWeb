import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-overlay.component.html',
  styleUrl: './card-overlay.component.css'
})
export class CardOverlayComponent {
  @Input() visible: boolean = false;
}
