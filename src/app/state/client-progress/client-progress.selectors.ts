import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ClientProgressState } from "./client-progress.reducer";


export const selectClientProgressState = createFeatureSelector<ClientProgressState>('clientProgressInfos');

export const selectProgress = (client_id: number) => createSelector(selectClientProgressState,
    state => state.progress_infos.find(p => p.client_id === client_id)
);
