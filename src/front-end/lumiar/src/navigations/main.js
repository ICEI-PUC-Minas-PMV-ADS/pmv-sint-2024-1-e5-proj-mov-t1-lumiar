import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import SponsorRegistration from '../pages/SponsorRegistration';
import ProfileSponsor from '../pages/sponsor/ProfileSponsor';
import InstitutionRegistration from '../pages/InstitutionRegistration';
import InstitutionHome from '../pages/InstitutionHome';
import ProfileInstitution from '../pages/institution/ProfileInstitution.js';
import EscolhaDeUser from '../pages/apagarDepois/EscolhaDeUser';
import PaymentSponsor from '../pages/sponsor/PaymentSponsor.js';

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
                name="SponsorRegistration"
                component={SponsorRegistration}
                options={{
                    header: () => null,
                }}
            />

            <Stack.Screen
                name="ProfileSponsor"
                component={ProfileSponsor}
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

            <Stack.Screen
                name="PaymentSponsor"
                component={PaymentSponsor}
                options={{
                    header: () => null,
                }}
            />

            <Stack.Screen
                name="EscolhaDeUser"
                component={EscolhaDeUser}
                options={{
                    header: () => null,
                }}
            />

            <Stack.Screen
                name="InstitutionRegistration"
                component={InstitutionRegistration}
                options={{
                    header: () => null,
                }}
            />

            <Stack.Screen
                name="InstitutionHome"
                component={InstitutionHome}
                options={{
                    title: 'Crianças cadastradas',
                    headerBackVisible: false,
                    headerTitleAlign: 'left',
                    hideWhenScrolling: true

                }}
            />

        </Stack.Navigator>
    );
};

export default Main;