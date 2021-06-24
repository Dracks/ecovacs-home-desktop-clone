import React from 'react'
import { Country } from '../country'
import createApi from './api'
import { EcovacsContext, IEcovacsContext } from './api-context'
import { EcoVacsAPI } from 'ecovacs-deebot';
import { useAsyncCallback } from 'react-async-hook';


const useEcovacsProvider = (opts?:{
    onComplete?: (country: Country, user: string, password: string)=>void
})=>{
    const [extraData, setExtraData] = React.useState<Omit<IEcovacsContext, "api">>()
    const loginCb = useAsyncCallback(async (country:Country, username:string, hashPassword: string)=>{
        console.log("Login", country, username, hashPassword)
        const {api, continent} = createApi(country)
        const data = await api.connect(username, hashPassword)
        console.log("Data", data)
        opts?.onComplete(country, username, hashPassword);
        setExtraData({countrycode: country, continent})
        return api
    })
    console.log(loginCb.result)

    return {
        login: loginCb.execute,
        loading: loginCb.loading,
        isIdentified: loginCb.result !== undefined,
        error: loginCb.error,
        EcoVacsProvider: ({children})=><EcovacsContext.Provider value={{ ...extraData, api: loginCb.result}}>{children}</EcovacsContext.Provider>
    }
}

export default useEcovacsProvider