import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';


export default function SetUser() {
    const navigation = useNavigation();


    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <Image
                    source={require('../../assets/Lumiar_branco.png')}
                    style={styles.imageLogo}
                />
                <Text style={styles.txt}>Olá, Selecione uma opção para continuar com o cadastro!</Text>


            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SponsorRegistration')}>
                    <Text style={styles.textBtn}>Quero apadrinhar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('InstitutionRegistration')}>
                    <Text style={styles.textBtn}>Sou instituição</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6C7E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageLogo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 100,
    },
    txt: {
        fontWeight: 'regular',
        fontSize: 20,
        color: '#383839',
        margin: 20
    },
    btnContainer: {
        flex: 3,
        width: '100%',
        padding: 10,
    },
    btn: {
        backgroundColor: '#C693C6',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    textBtn: {
        color: '#ffffff'
    },
});

