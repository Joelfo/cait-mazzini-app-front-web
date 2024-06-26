import { BiopsyExam } from "Api/Types/Exams/BiopsyExam";
import { ComplementaryExamAPI } from "./Base/ComplementaryExamAPI";
import { useComplementaryExamApi } from "./Base/useComplementaryExamApi";

export class BiopsyExamAPI extends ComplementaryExamAPI<BiopsyExam> {
    constructor(){
        super("BiopsyExams");
    }
}

export const useBiopsyExamApi = () => useComplementaryExamApi<BiopsyExam>('BiopsyExams');