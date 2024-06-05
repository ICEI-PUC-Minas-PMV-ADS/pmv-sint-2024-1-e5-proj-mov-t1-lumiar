import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import SponsorRegistration from '../pages/sponsor/SponsorRegistration.js';
import ProfileSponsor from '../pages/sponsor/ProfileSponsor';
import InstitutionRegistration from '../pages/institution/InstitutionRegistration.js';
import InstitutionHome from '../pages/institution/InstitutionHome.js';
import ProfileInstitution from '../pages/institution/ProfileInstitution.js';
import EscolhaDeUser from '../pages/apagarDepois/EscolhaDeUser';
import PaymentSponsor from '../pages/sponsor/PaymentSponsor.js';
import SponsorHome from '../pages/sponsor/SponsorHome.js';
import SetUser from '../pages/SetUser.js';
import ChildRegister from '../pages/institution/ChildRegister.js';

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
                name="SponsorHome"
                component={SponsorHome}
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
                    header: () => null
                }}
            />

            <Stack.Screen
                name="SetUser"
                component={SetUser}
                options={{
                    header: () => null,
                }}
            />

            <Stack.Screen
                name="ChildRegister"
                component={ChildRegister}
                options={{
                    header: () => null,
                }}
            />

        </Stack.Navigator>
    );
};

export default Main;