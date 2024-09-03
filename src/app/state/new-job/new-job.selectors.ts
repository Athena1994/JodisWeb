import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { NewJobState } from "./new-job.reducer";

export const selectNewJobState = createFeatureSelector<NewJobState>('newJob');

export const selectName = createSelector(selectNewJobState,
    state => state.name ?? ""
);
export const selectDescription = createSelector(selectNewJobState,
    state => state.description ?? ""
);

export const selectConfig = createSelector(selectNewJobState,
    state => state.config ?? JSON.parse('{}')
);

export const isReadyToCreate = createSelector(selectNewJobState,
    state => state.name !== null
    && state.description !== null
    && state.config !== null
);

export const hasValidConfig = createSelector(selectNewJobState,
    state => state.config !== null
);

export const isValidating = createSelector(selectNewJobState,
    state => state.status === 'validating'
);
export const isCreating = createSelector(selectNewJobState,
    state => state.status === 'creating'
);

export const getJob = createSelector(selectNewJobState,
    state => ({
        name: state.name ?? "",
        description: state.description ?? "",
        config: state.config ?? JSON.parse('{}')
    })
);

export const selectError = createSelector(selectNewJobState,
    state => state.error
);

export const selectStatus = createSelector(selectNewJobState,
    state => state.status
);