import React from 'react';
import { Window, Text, View } from '@nodegui/react-nodegui'
import { QSettings } from '@nodegui/nodegui';
import { EcoVacsAPI, countries } from 'ecovacs-deebot';
import LoginScreen from './login/login-screen';
import ProtectedContent from './home/main-home';
const nodeMachineId = require('node-machine-id');

const minSize = { width: 800, height: 600 };

const settings = new QSettings('es.jaumesingla', 'ecovacs-nodegui')

export interface Credentials {
    user?: string,
    hash_password?: string,
}

const device_id = EcoVacsAPI.getDeviceId(nodeMachineId.machineIdSync());

const countrycode = "DE"
const continent = countries[countrycode].continent.toLowerCase();
const api = new EcoVacsAPI(device_id, countrycode, continent);

const Content : React.FC = ()=>{
    const [credentials, setCredentials] = React.useState<Credentials>({
        user: settings.value('user').toString(),
        hash_password: settings.value('hash_password').toString()
    })
    const [isIdentified, setIsIdentified] = React.useState(false)
    const [ isLoading, setIsLoading] = React.useState(false)

    React.useEffect(()=>{
        if (credentials.user && credentials.hash_password){
            api.connect(credentials.user, credentials.hash_password).then(data=>{
                console.log(data)
                setIsIdentified(true)
                settings.setValue('user', credentials.user)
                settings.setValue('hash_password', credentials.hash_password)
                setIsLoading(false)
            }, (err)=>{
                console.log(err)
                setIsLoading(false)
            })
        }
    }, [credentials])
    if (isIdentified){
        return <ProtectedContent/>
    }
    if (isLoading){
        return <View><Text>Loading...</Text></View>
    }
    return <LoginScreen setCredentials = {(user: string, password: string)=>{
        setIsLoading(true)
        setCredentials({
            user,
            hash_password: EcoVacsAPI.md5(password)
        })
    }} />
}

export const App: React.FC = ()=>{
    return <Window
        windowTitle="Ecovacs"
        minSize={minSize}
        styleSheet={styleSheet}
    ><Content /></Window>
}

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }

  #step-1, #step-2 {
    font-size: 18px;
    padding-top: 10px;
    padding-horizontal: 20px;
  }
`;

export default App;