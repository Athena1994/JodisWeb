import { createFeature, createFeatureSelector, createSelector, select } from "@ngrx/store";
import { MetaState } from "./meta.reducer";

export const selectMetaState = createFeatureSelector<MetaState>('meta');

export const selectModules = createSelector(selectMetaState,
    state => state.modules);

export const selectVersion = createSelector(selectMetaState,
    state => state.version);

