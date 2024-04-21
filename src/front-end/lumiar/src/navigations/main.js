import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import CadastroPadrinho from '../pages/cadastro-padrinho';
import ProfileInstitution from '../pages/ProfileInstitution';

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

            <Stack.Screen
                name="ProfileInstitution"
                component={ProfileInstitution}
                options={{
                    header: () => null,
                }}
            />
        </Stack.Navigator>
    );
};

export default Main;