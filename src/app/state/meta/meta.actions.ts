import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ModuleMeta } from "../../models/module-meta.interface";
import { ModuleManagerComponent } from "../../components/module-manager/module-manager.component";


export const metaActions = createActionGroup({
    source: 'Meta',
    events: {
      LoadModules: emptyProps(),
      LoadModulesSuccess: props<{ modules: ModuleMeta[] }>(),
      LoadModulesFailure: props<{ error: string }>(),

      GetServerVersion: emptyProps(),
      GetServerVersionSuccess: props<{ version: string }>(),
      GetServerVersionFailure: props<{ error: string }>(),

      UploadModule: props<{zip: File, overwrite: boolean}>(),
      UploadModuleSuccess: props<{ module: ModuleMeta}>(),
      UploadModuleFailure: props<{ error: string}>(),

      DeleteModule: props<{ module: ModuleMeta}>(),
      DeleteModuleSuccess: props<{ moduleName: string}>(),
      DeleteModuleFailure: props<{ error: string}>(),

      ReloadModule: props<{ moduleName: string}>(),
      ReloadModuleSuccess: props<{ module: ModuleMeta}>(),
      ReloadModuleFailure: props<{ error: string}>(),

    }
  });
