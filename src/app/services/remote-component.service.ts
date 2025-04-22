import { createComponent, inject, Injectable, InjectionToken, Injector, runInInjectionContext, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteComponentService {

  constructor(
  ) {}


  async loadComponent(url: string, component?: string) {

    return this.loadModule(url)
      .then((module) => {
        const componentType
          = component !== undefined ? module[component] : module.default;
        if (!componentType) {
          throw new Error(`Component ${component} not found in module`);
        }
        return componentType;
      }
    ).catch((error) => {
        console.error(`Error loading component ${component} from ${url}`, error);
        throw error;
      }
    );
  }

  async loadModule(url: string): Promise<any> {
    // Import the module
    const module = await import(/* @vite-ignore */ url);
    return module;
  }
}