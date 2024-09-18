import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Client } from "../../models/client.interface";
import { empty } from "rxjs";


export const clientActions = createActionGroup({
    source: 'Clients',
    events: {
      Load: emptyProps(),
      LoadSuccess: props<{ clients: Client[] }>(),
      LoadFailure: props<{ error: string }>(),


      ApplyUpdates: props<{ id: number, updates: any }>(),
      ApplyAdd: props<{ client: Client }>(),
      ApplyRemove: props<{ ids: [number] }>(),

      SendClientRequest: props<{ client: Client, cmd: string, value: any }>(),
      SendClientRequestSuccess: emptyProps(),
      SendClientRequestFailure: props<{ error: string }>(),
    }
  });
