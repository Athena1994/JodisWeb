import { Job } from "./job.interface";

export interface Client {
    id: number;
    name: string;
    connected: boolean;
    jobIds: number[];
    jobs: Job[];
    state: string;
}