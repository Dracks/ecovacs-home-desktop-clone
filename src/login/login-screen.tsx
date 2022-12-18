import { BoxView, View, Text, LineEdit, Button } from '@nodegui/react-nodegui';
import { Direction, EchoMode } from '@nodegui/nodegui'
import React from 'react';
import { Country } from '../country';

interface LoginScreenProps {
    setCredentials: (c: Country, u: string, p: string )=>void
    defaultUser?: string
}

const LoginScreen: React.FC<LoginScreenProps> = ({defaultUser, setCredentials})=>{
    const [ user, setUser ] = React.useState<string>(defaultUser || "")
    const [ password, setPassword ] = React.useState<string>("")
    
    return (
        <View id='login-screen' style={rootViewStyle} >
            <View style={flex}/>
            <View style={columnStyle}>
                <View style={flex}/>
                <Text>Login</Text>
                <LineEdit text={user} on={{textChanged: (text)=>setUser(text)}}/>
                <LineEdit text={password} on={{textChanged: (text)=>setPassword(text)}} echoMode={EchoMode.Password}/>
                <Button on={{clicked: ()=>setCredentials(Country.Germany, user, password)}}>Connect</Button>
                <View style={flex} />
            </View>
            <View style={flex} />
            </View>
    )
    
}

const columnStyle = `
`

const rootViewStyle = `
  flex-direction: row;
`;

const flex = `
    flex: 1;
`

export default LoginScreen