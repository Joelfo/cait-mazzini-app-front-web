import { PPDExam } from "Api/Types/Exams/PPDExam";
import { ComplementaryExamAPI } from "./Base/ComplementaryExamAPI";
import { useComplementaryExamApi } from "./Base/useComplementaryExamApi";

export class PPDExamAPI extends ComplementaryExamAPI<PPDExam> {
    constructor(){
        super("PPDExams");
    }
}

export const usePpdExamApi = () => useComplementaryExamApi<PPDExam>('PPDExams');