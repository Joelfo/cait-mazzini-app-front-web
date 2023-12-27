import { useMutation, useQuery } from "@tanstack/react-query";
import { useSubResourceAPI } from "./Base/useSubResourceAPI";
import { API_URL } from "util/requests";
import axios from "axios";

export const useScannedChartAPI = () => {
    const useShow = () => {
        return useMutation({
            mutationFn: async ({ patientId } : { patientId: number }) => {
                const response = await axios.get<Blob>(`${API_URL}/Patients/${patientId}/ScannedChart`, {
                    responseType: 'blob'
                });
                return response.data
            }
        })
    };

    const useCreate = () => useMutation({
        mutationFn: async ({ patientId, file } : { patientId: number, file: File }) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `${API_URL}/Patients/${patientId}/ScannedChart`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data;
        }
    });

    const useCheck = (patientId: number | undefined) => useQuery(
        ['Patients', 'ScannedChart', 'Check'], 
        async () => {
            const response = await axios.get(
                `${API_URL}/Patients/${patientId}/ScannedChart/Check`
            );

            return response.data;
        }, {
            enabled: !!patientId
        }
    )

    return { useShow, useCreate, useCheck }
}