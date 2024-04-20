import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

export default function CadastroPadrinho() {
    const [cpf, setCpf] = useState('');
    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <Image
                source={require('../../assets/Lumiar_branco.png')}
                style={styles.imageLogo}
            />

            <View style={styles.formContainer}>
                <Text style={styles.signUpTxt}>Cadastre-se</Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Nome"
                        keyboardType='default'
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="E-mail"
                        keyboardType='email-address'
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInputMask 
                    style={styles.inputText}
                    placeholder="CPF"
                    keyboardType='numeric'
                    type={'cpf'}
                    value={cpf}
                    onChangeText={text => setCpf(text)}
 
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Data de nascimento"
                        keyboardType='numeric'
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Senha"
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Confirme sua senha"
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerTextBtn}>Cadastrar</Text>
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
        marginBottom: 60,
    },
    signUpTxt: {
        fontWeight: 'regular',
        fontSize: 40,
        color: '#383839',
        marginBottom: 40,
        marginTop: 20,
    },
    inputView: {
        width: '80%',
        backgroundColor: '#E7E7E7',
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
    btnRegister: {
        width: '80%',
        backgroundColor: '#C693C6',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    registerTextBtn: {
        color: '#ffffff'
    },
});