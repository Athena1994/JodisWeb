import { CommonModule, NgComponentOutlet, AsyncPipe } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component, createComponent, createEnvironmentInjector, EnvironmentInjector, inject, Injector, NgZone, OnInit, runInInjectionContext, ViewChild, ViewContainerRef } from '@angular/core';
import { RemoteComponentService } from '../../services/remote-component.service';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-remote-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, AsyncPipe],
  template: `

  @if ((component$ | async); as component){
    <ng-container *ngComponentOutlet="component;"></ng-container>
  } @else {
    loading...
  }
`})
export class RemoteHostComponent{

  public environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);
  public injector: Injector = inject(Injector);

  protected remoteComponentService = inject(RemoteComponentService);
  protected component$ = this.remoteComponentService.loadComponent(
    'http://localhost:3000/TestModule/0.0.1/test-module.mjs');

  async ngOnInit() {
  }



}
