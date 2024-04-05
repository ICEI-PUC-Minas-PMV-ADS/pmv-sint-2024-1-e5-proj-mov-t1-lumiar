import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';

export default function Login() {
    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <Image
                source={require('../../assets/Logo-login.png')}
                style={styles.imageLogo}
            />

            <View style={styles.formContainer}>

                <Text style={styles.loginTxt}>Login</Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Usuário"
                        placeholderTextColor="#003f5c"
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Senha"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.loginTextBtn}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerTextBtn}>Criar conta</Text>
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
        resizeMode: 'contain'
    },
    loginTxt: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#000000',
        marginBottom: 40
    },
    inputView: {
        width: '80%',
        backgroundColor: '#d3d3d3',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },
    inputText: {
        height: 50,
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
        color: '#ffffff'
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
        borderRadius: 25
    }

});