import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ClientProgress } from "../../models/client-progress.interface";


export const clientProgressActions = createActionGroup({
    source: 'ClientProgressInfos',
    events: {
      LoadAll: emptyProps(),
      LoadAllSuccess: props<{ progress_infos: ClientProgress[] }>(),
      LoadAllFailure: props<{ error: string }>(),

      ApplyUpdates: props<{ id: number, updates: any }>(),
      ApplyAdd: props<{ client_progress: ClientProgress }>(),
      ApplyRemove: props<{ ids: [number] }>(),

    }
  });
