import React from 'react';
import { useAsync } from 'react-async-hook';
import useEcovacs from '../ecovacs/api-context';
import MainHome from './main-home';
import { Text } from '@nodegui/react-nodegui';


const ProtectedContent: React.FC = ()=>{
    const { api } = useEcovacs()
    const loadDevices = useAsync(()=>api.devices(), []);
    
    if (loadDevices.loading){
        return <Text>Loading</Text>
    }
    return <MainHome devices = {loadDevices.result}/>
}

export default ProtectedContent;