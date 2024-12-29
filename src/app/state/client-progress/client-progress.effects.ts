import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { clientProgressActions } from "./client-progress.actions";
import { Client } from "../../models/client.interface";
import { ClientService } from "../../services/clients.service";


@Injectable()
export class ClientProgressEffects{

    loadAll$ = createEffect(() => this.actions$.pipe(
        ofType(clientProgressActions.loadAll),
        switchMap(() => this.clientService.getProgressInfos().pipe(
            map(progress_infos => clientProgressActions.loadAllSuccess({ progress_infos })),
            catchError(error => of(clientProgressActions.loadAllFailure({ error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        private clientService: ClientService
    ){}
}