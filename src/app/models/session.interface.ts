import { Progress } from "./progress.interface";


export interface Session {
    id: number;
    job_id: number;

    epoch: Progress;
}