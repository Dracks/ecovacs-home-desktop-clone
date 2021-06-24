import React from 'react';
import { Window, Text, View } from '@nodegui/react-nodegui'
import { QSettings } from '@nodegui/nodegui';

import LoginScreen from './login/login-screen';
import ProtectedContent from './home/protected-content';
import useEcovacsProvider from './ecovacs/api-provider';
import { Country } from './country';
import ErrorBoundary from './error-boundary';
import { EcoVacsAPI } from 'ecovacs-deebot';


const minSize = { width: 800, height: 600 };

const settings = new QSettings('es.jaumesingla', 'ecovacs-nodegui')

export interface Credentials {
    country?: Country
    user?: string,
    hashPassword?: string,
}

const Content: React.FC = () => {
    const { EcoVacsProvider, ...ecoVacs } = useEcovacsProvider({
        onComplete: (country, user, password) => {
            settings.setValue('country', country)
            settings.setValue('user', user)
            settings.setValue('hash_password', password)
        }
    })
    const credentials = React.useMemo(() => ({
        country: settings.value('country').toString() as Country,
        user: settings.value('user').toString(),
        hash_password: settings.value('hash_password').toString()
    }), [])


    React.useEffect(() => {
        if (credentials.country && credentials.user && credentials.hash_password) {
            ecoVacs.login(credentials.country, credentials.user, credentials.hash_password)
        }
    }, [])
    if (ecoVacs.isIdentified) {
        return <EcoVacsProvider><ProtectedContent /></EcoVacsProvider>
    }
    if (ecoVacs.loading) {
        return <View><Text>Loading...</Text></View>
    }
    return <LoginScreen defaultUser={credentials.user} setCredentials={(country: Country, user: string, password: string) => {
        ecoVacs.login(country, user, EcoVacsAPI.md5(password))
    }} />
}

export const App: React.FC = () => {
    return <Window
        windowTitle="Ecovacs"
        minSize={minSize}
        styleSheet={styleSheet}
    >
        <ErrorBoundary>
            <Content />
        </ErrorBoundary>
    </Window>
}

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }
`;

export default App;