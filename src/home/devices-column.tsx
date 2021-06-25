import { Button, Text } from '@nodegui/react-nodegui';
import { EcovacsDevice } from 'ecovacs-deebot';
import React from 'react';
import SupportedDevices from '../ecovacs/suported-devices';

interface IDevicesColumnProps {
    devices: EcovacsDevice[]
    selectDevice: (d: EcovacsDevice)=>void
}

const DevicesColumn: React.FC<IDevicesColumnProps> = ({devices, selectDevice})=>{
    return  <React.Fragment>
        <Text>Devices</Text>
        {devices && devices.map((dev, idx)=>{
            const devInfo = SupportedDevices[dev.class]
            if (devInfo){
                return (<Button key={idx} on={{clicked:()=>selectDevice(dev)}}>{devInfo.name}</Button>)
            } else {
                return (<Text key={idx}>Unsuported {dev.class}</Text>)
            }
        })}
    </React.Fragment>
}

export default DevicesColumn