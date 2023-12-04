import { ToraxXRayExam } from "types/Api/Exams/ToraxXRayExam";
import { ResourceAPI } from "./Base/ResourceAPI";
import { ComplementaryExamAPI } from "./Base/ComplementaryExamAPI";

export class ToraxXRayExamAPI extends ComplementaryExamAPI<ToraxXRayExam> {
    constructor(){
        super('ToraxXRayExams');
    }
}