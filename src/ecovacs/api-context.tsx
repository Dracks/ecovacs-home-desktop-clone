import React from 'react';
import { EcoVacsAPI } from 'ecovacs-deebot';

export interface IEcovacsContext {
    api?: EcoVacsAPI,
    countrycode?: string,
    continent?: string
}

export const EcovacsContext = React.createContext<IEcovacsContext>({})

const useEcovacs = ()=>React.useContext(EcovacsContext)

export default useEcovacs