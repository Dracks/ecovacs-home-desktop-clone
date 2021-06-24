import { EcovacsDevice } from 'ecovacs-deebot';
import React from 'react';
import { View } from '@nodegui/react-nodegui';
import DevicesColumn from './devices-column';

interface IMainHomeProps {
    devices: EcovacsDevice[]
}

const MainHome : React.FC<IMainHomeProps> = ({devices})=>{
    return <View style={viewStyle}>
    <View>
        <DevicesColumn devices={devices} />
    </View>
    <View style={flex}>

    </View>
</View>
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