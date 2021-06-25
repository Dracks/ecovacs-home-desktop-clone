import { EcovacsDevice } from 'ecovacs-deebot';
import React from 'react';
import { Text, View } from '@nodegui/react-nodegui';
import useVacBot from '../../ecovacs/vacboot';


interface IShowDevice {
    device: EcovacsDevice
}

const ShowDevice: React.FC<IShowDevice> = ({device})=>{
    const {device:state, isLoading} = useVacBot(device, ["BatteryInfo", "ChargeState", "CleanLog", "DeebotPosition", "MapImage"])
    if (isLoading || !state){
        return <Text>Loading...</Text>
    }
    console.log(state.MapImage, isLoading)
    return <React.Fragment>
        <View style={header}>
            <Text style={flex}>Charge: {state.ChargeState}</Text>
            <Text style={flex}>Battery: {state.BatteryInfo}</Text>
            <Text style={flex}>Position: {state.DeebotPosition}</Text>
        </View>
        </React.Fragment>
}

const header = `
    flex-direction: row;
`

const flex = `
    flex: 1;
`

export default ShowDevice