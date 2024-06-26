import { ClinicalHistory } from "Api/Types/ClinicalHistory";
import { ResourceAPI } from "./Base/ResourceAPI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Immunization } from "Api/Types/Immunization";
import { ClinicalHistoryHasDatedImmunizationDTO } from "Api/Types/DTOs/ClinicalHistoryHasDatedImmunizationDTO";
import { Desease } from "Api/Types/Desease";
import { useResourceAPI } from "./Base/useResourceAPI";
import { useAuthStore } from "Stores/useAuthStore";
import { ClinicalHistoryHasDatedImmunization } from "Api/Types/ClinicalHistoryHasDatedImmunization";

export class ClinicalHistoryAPi extends ResourceAPI<ClinicalHistory>{
    constructor(){
        super('ClinicalHistories');
    }

    public useImmunizations = (clinicalHistoryId?: number) => useQuery(
        ['ClincalHistories.Immunizations', clinicalHistoryId],
        async () => {
            const response = await axios.get<Immunization[]>(
                `${this.resourceRoute}/${clinicalHistoryId}/Immunizations`
            );
            return response.data;
        }, {
            enabled: !!clinicalHistoryId
        }
    );

    public useDatedImmunizations = (clinicalHistoryId?: number) => useQuery(
        ['ClinicalHistories.DatedImmunizations', clinicalHistoryId],
        async () => {
            const response = await axios.get<ClinicalHistoryHasDatedImmunizationDTO[]>(
                `${this.resourceRoute}/${clinicalHistoryId}/DatedImmunizations`
            );
            return response.data;
        }, {
            enabled: !!clinicalHistoryId
        }
    );

    public usePreviousDeseases = (clinicalHistoryId?: number) => useQuery(
        ['ClinicalHistories.PreviousDeseases', clinicalHistoryId],
        async () => {
            const response = await axios.get<Desease[]>(
                `${this.resourceRoute}/${clinicalHistoryId}/PreviousDeseases`
            );
            return response.data;
        }, {
            enabled: !!clinicalHistoryId
        }
    )
}

export const useClinicalHistoryApi = () => {
    const { headers, ...resourceApi } = useResourceAPI<ClinicalHistory>('ClinicalHistories');

    const useImmunizations = (clinicalHistoryId?: number) => useQuery(
        ['ClincalHistories.Immunizations', clinicalHistoryId],
        async () => {
            const response = await axios.get<Immunization[]>(
                `${resourceApi.resourceUrl}/${clinicalHistoryId}/Immunizations`,
                {
                    headers
                }
            );
            return response.data;
        }, {
            enabled: !!clinicalHistoryId
        }
    );

    const useDatedImmunizations = (clinicalHistoryId?: number) => useQuery(
        ['ClinicalHistories.DatedImmunizations', clinicalHistoryId],
        async () => {
            const response = await axios.get<ClinicalHistoryHasDatedImmunization[]>(
                `${resourceApi.resourceUrl}/${clinicalHistoryId}/DatedImmunizations`,
                {
                    headers
                }
            );
            return response.data;
        }, {
            enabled: !!clinicalHistoryId
        }
    );

    const usePreviousDeseases = (clinicalHistoryId?: number) => useQuery(
        ['ClinicalHistories.PreviousDeseases', clinicalHistoryId],
        async () => {
            const response = await axios.get<Desease[]>(
                `${resourceApi.resourceUrl}/${clinicalHistoryId}/PreviousDeseases`,
                {
                    headers
                }
            );
            return response.data;
        }, {
            enabled: !!clinicalHistoryId
        }
    )

    return { ...resourceApi, useImmunizations, usePreviousDeseases, useDatedImmunizations }
}