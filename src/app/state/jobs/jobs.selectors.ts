import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { JobsState } from "./jobs.reducer";


export const selectJobsState = createFeatureSelector<JobsState>('jobs');

export const selectJobs = createSelector(selectJobsState,
    state => state.jobs
);
export const selectAssignedJobs = createSelector(selectJobs,
    jobs => jobs.filter(job => job.state === 'ASSIGNED')
);
export const selectUnassignedJobs = createSelector(selectJobs,
    jobs => jobs.filter(job => job.state === 'UNASSIGNED')
);
export const selectFinishedJobs = createSelector(selectJobs,
    jobs => jobs.filter(job => job.state === 'FINISHED')
);

export const selectSelectedJob = createSelector(selectJobsState,
    state => state.selectedJob
);

export const selectScheduledJobsByClientId = (clientId: number) => createSelector(selectJobs,
    jobs => jobs.filter(job => job.client_id === clientId && job.sub_state == "SCHEDULED"
    ).sort((a, b) => a.rank - b.rank));


export const selectActiveClientJob = (clientId: number) => createSelector(selectJobs,
    jobs => jobs.filter(job => job.client_id === clientId && job.sub_state == "RUNNING")
)



export const selectJobsByIds = (ids: number[]) => createSelector(selectJobs,
    jobs => jobs.filter(job => ids.includes(job.id)))