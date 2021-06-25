import { EcoVacsAPI, EcovacsDevice, VacBotCommand, VacBotEvent, VacBotLoader } from "ecovacs-deebot";
import { useAsync } from "react-async-hook";
import useEcovacs from "./api-context";
import React from 'react';
import { VacBotState } from "./types/vac-bot-state";
import { TRANSFORM_HASH } from "./types/command-transform";
import VacBot from "ecovacs-deebot/library/vacBot";

const useVacBot = (device: EcovacsDevice, fields: Array<keyof VacBotState>) => {
    const {api, continent} = useEcovacs()
    const vacBotRef = React.useRef<Partial<VacBotState>>({})
    const [ deviceInfo, setDevice ] = React.useState<Partial<VacBotState> | undefined>()

    const {result: vacBot, loading} = useAsync<VacBotLoader>((deviceToRetrieve: EcovacsDevice)=>new Promise<VacBotLoader>((resolve)=>{
        const vacBot = api.getVacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, deviceToRetrieve, continent)
        vacBot.on('ready', (event)=>{
            console.log(`Device ${deviceToRetrieve.did} ready`, event)

            fields
                .map((key)=>{
                    vacBot.on(key, (data)=>{
                        vacBotRef.current[key] = data as string
                        setDevice({...vacBotRef.current})
                    })
                })

            fields
                .map(event=>TRANSFORM_HASH[event])
                .filter(command => command)
                .forEach(command=>{
                vacBot.run(command)
            })
            
            vacBot.connect()
            resolve(vacBot)
            
        })
    }), [device])

    React.useEffect(()=>{
        return ()=>{
            if (vacBot){
                vacBot.disconnect()
            }
        }
    }, [vacBot])

    return {
        isLoading: loading,
        device: deviceInfo
    }
}

export default useVacBot