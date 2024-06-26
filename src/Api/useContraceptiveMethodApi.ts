import { ContraceptiveMethod } from "Api/Types/ContraceptiveMethod";
import { ResourceAPI } from "./Base/ResourceAPI"
import { useResourceAPI } from "./Base/useResourceAPI";

export class ContraceptiveMethodAPI extends ResourceAPI<ContraceptiveMethod> {
    constructor(){
        super('ContraceptiveMethods');
    }
}

export const useContraceptiveMethodApi = () => useResourceAPI<ContraceptiveMethod>('ContraceptiveMethods');