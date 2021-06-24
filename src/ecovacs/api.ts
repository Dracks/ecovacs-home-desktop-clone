import { EcoVacsAPI, countries } from 'ecovacs-deebot';
import { Country } from '../country';

const nodeMachineId = require('node-machine-id');

const device_id = EcoVacsAPI.getDeviceId(nodeMachineId.machineIdSync());

const createApi = (countrycode: Country)=>{
    const continent = countries[countrycode].continent.toLowerCase();

    return {
        api: new EcoVacsAPI(device_id, countrycode, continent),
        continent,
    }
}
export default createApi;