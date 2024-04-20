import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login';
import CadastroPadrinho from '../pages/cadastro-padrinho';

const Stack = createNativeStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen
                name="CadastroPadrinho"
                component={CadastroPadrinho}
                options={{
                    header: () => null,
                }}
            />
        </Stack.Navigator>
    );
};

export default Main;