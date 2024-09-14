import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Client } from "../../models/client.interface";
import { empty } from "rxjs";


export const clientActions = createActionGroup({
    source: 'Clients',
    events: {
      Load: emptyProps(),
      LoadSuccess: props<{ clients: Client[] }>(),
      LoadFailure: props<{ error: string }>(),

      ApplyUpdates: props<{ client_id: number, updates: any }>(),

      SendClientRequest: props<{ client: Client, cmd: string, value: any }>(),
      SendClientRequestSuccess: emptyProps(),
      SendClientRequestFailure: props<{ error: string }>(),
    }
  });
