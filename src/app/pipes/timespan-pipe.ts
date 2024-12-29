import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'timespan',
    standalone: true
  })
  export class TimespanPipe implements PipeTransform {
    transform(total_secs: number): string {
      const seconds = total_secs % 60;
      const minutes = Math.floor(total_secs / 60) % 60;
      const hours = Math.floor(total_secs / 3600);
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  }
