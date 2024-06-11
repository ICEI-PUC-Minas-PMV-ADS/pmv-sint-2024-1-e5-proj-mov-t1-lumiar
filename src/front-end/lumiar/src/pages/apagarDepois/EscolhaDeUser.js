import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function EscolhaDeUser() {
    const navigation = useNavigation();

    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <View>
                <Text style={styles.loginTxt}>Escolha o usuário</Text>

                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('ProfileSponsor')}>
                    <Text style={styles.loginTextBtn}>Perfil padrinho</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('ProfileInstitution')}>
                    <Text style={styles.registerTextBtn}>Perfil Instituição</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('PaymentSponsor')}>
                    <Text style={styles.registerTextBtn}>Pagamento</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('SponsorHome')}>
                    <Text style={styles.registerTextBtn}>Lista de instituicões</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('InstitutionHome')}>
                    <Text style={styles.registerTextBtn}>Lista de crianças</Text>
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
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    loginTxt: {
        fontWeight: 'regular',
        fontSize: 40,
        color: '#383839',
        marginBottom: 40,
        marginTop: 20,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#E7E7E7',
        borderRadius: 30,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        color: '#000000'
    },
    btnLogin: {
        width: '80%',
        backgroundColor: '#C693C6',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    btnRegister: {
        width: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderColor: '#C693C6',
        borderWidth: 2,
    },
    registerTextBtn: {
        color: '#000000'
    },
    loginTextBtn: {
        color: '#ffffff',
    },
    forgotPassword: {
        color: '#007bff',
        fontSize: 14,
        marginBottom: 10
    },
    formContainer: {
        width: '80%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    passwordIcon: {
        paddingBottom: 20,
        color: '#383839'
    }
});