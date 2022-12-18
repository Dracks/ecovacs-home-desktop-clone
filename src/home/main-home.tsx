import { EcovacsDevice } from 'ecovacs-deebot';
import React from 'react';
import { View } from '@nodegui/react-nodegui';
import DevicesColumn from './devices-column';
import ShowDevice from './device/show-device';

interface IMainHomeProps {
    devices: EcovacsDevice[]
}

const MainHome : React.FC<IMainHomeProps> = ({devices})=>{
    const [ selectedDevice, setDevice ] = React.useState<EcovacsDevice | undefined>()
    /*return <View style={viewStyle}>
    <View>
        <DevicesColumn devices={devices} selectDevice={setDevice}/>
    </View>
    <View style={flex}>
        {selectedDevice && <ShowDevice device={selectedDevice} />}
    </View>
    </View>
*/
    return <Text>MainHome</Text>
}

const viewStyle = `
    flex-direction: row;
`;

const flex=`
    flex: 1;
    flex-direction: column;
    width: 100px;
`

export default MainHome