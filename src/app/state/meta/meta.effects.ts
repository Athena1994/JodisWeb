import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { metaActions} from "./meta.actions";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { ConfigValidationService } from "../../services/configValidation.service";
import { JobService } from "../../services/jobs.service";
import { Store } from "@ngrx/store";
import { MetaService } from "../../services/meta.service";

@Injectable()
export class MetaEffects{

    loadModules$ = createEffect(() => this.actions$.pipe(
        ofType(metaActions.loadModules),
        switchMap(() =>
            this.metaService.getModuleList().pipe(
                map(modules => metaActions.loadModulesSuccess({ modules })),
                catchError(error => of(metaActions.loadModulesFailure(
                    { error })))
        ))));

    getServerVersion$ = createEffect(() => this.actions$.pipe(
        ofType(metaActions.getServerVersion),
        switchMap(() =>
            this.metaService.getServerVersion().pipe(
                map(version => metaActions.getServerVersionSuccess({ version })),
                catchError(error => of(metaActions.getServerVersionFailure(
                    { error })))
        ))));

    uploadModule$ = createEffect(() => this.actions$.pipe(
        ofType(metaActions.uploadModule),
        switchMap(({zip, overwrite}) =>
            this.metaService.uploadModule(zip, overwrite).pipe(
                map(module => metaActions.uploadModuleSuccess({ module })),
                catchError(error => of(metaActions.uploadModuleFailure(
                    { error })))
        ))));

    deleteModule$ = createEffect(() => this.actions$.pipe(
        ofType(metaActions.deleteModule),
        switchMap(({module}) =>
            this.metaService.deleteModule(module).pipe(
                map(() => metaActions.deleteModuleSuccess({ moduleId: module.id })),
                catchError(error => of(metaActions.deleteModuleFailure(
                    { error })))
        ))));

    constructor(
        private actions$: Actions,
        private metaService: MetaService,
        private store: Store
    ){}
}