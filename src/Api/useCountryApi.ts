import { Country } from "Api/Types/Country";
import { ResourceAPI } from "./Base/ResourceAPI";
import { useResourceAPI } from "./Base/useResourceAPI";

export class CountryAPI extends ResourceAPI<Country> {
    public constructor() {
        super('Countries');
    }
}

export const useCountryApi = () => useResourceAPI<Country>('Countries');