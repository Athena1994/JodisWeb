import { createReducer, on } from "@ngrx/store";
import { Job } from "../../models/job.interface";
import { inject } from "@angular/core";
import { Client } from "../../models/client.interface";
import { clientProgressActions } from "./client-progress.actions";
import { ClientProgress } from "../../models/client-progress.interface";



export interface ClientProgressState {
    progress_infos: ClientProgress[];
    status: 'idle' | 'pending';
    error: string | null;
};

const initialState: ClientProgressState = {
    progress_infos: [],
    status: 'idle',
    error: null
};


export const clientProgressReducer = createReducer(
    initialState,
    on(clientProgressActions.loadAll,
        (state) => ({ ...state, status: 'pending' as const, error: null})),
    on(clientProgressActions.loadAllSuccess,
        (state, {progress_infos}) =>
            ({ ...state, progress_infos, status: 'idle' as const })),
    on(clientProgressActions.loadAllFailure,
        (state, { error }) => ({ ...state, error, status: 'idle' as const })),


    on(clientProgressActions.applyUpdates,
        (state, { id, updates }) =>
            ({...state, progress_infos: state.progress_infos.map(c => c.client_id === id ? { ...c, ...updates } : c)})),
    on(clientProgressActions.applyAdd,
        (state, { client_progress }) => ({...state, progress_infos: [...state.progress_infos, client_progress]})),
    on(clientProgressActions.applyRemove,
        (state, {ids}) =>
            ({...state, progress_infos: state.progress_infos.filter(c => !ids.includes(c.client_id))})),

);