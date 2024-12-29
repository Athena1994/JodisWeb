import { Progress } from "./progress.interface";

export interface Report {

    phase: string;
    training: Progress;
    validation: Progress;
}
