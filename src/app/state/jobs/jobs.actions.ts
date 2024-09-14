import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Job } from "../../models/job.interface";
import { Client } from "../../models/client.interface";


export const jobsActions = createActionGroup({
    source: 'Jobs',
    events: {
      Load: emptyProps(),
      LoadSuccess: props<{ jobs: Job[] }>(),
      LoadFailure: props<{ error: string }>(),

      DeleteJobs: props<{ jobs: Job[] }>(),
      DeleteJobsSuccess: props<{ deletedIds: number[] }>(),
      DeleteJobsFailure: props<{ error: string }>(),

      SelectJob: props<{ job: Job }>(),

      AddJob: props<{ job: Job }>(),

      AssignJobs: props<{ jobs: Job[], client: Client | null }>(),
      AssignJobsSuccess: props<{ jobs: Job[] }>(),
      AssignJobsFailure: props<{ error: string }>(),

      ApplyUpdates: props<{ id: number, updates: any }>(),
    }
  });
