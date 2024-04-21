import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

export default function CadastroPadrinho() {
    const navigation = useNavigation();
    const [cpf, setCpf] = useState('');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

                    <TouchableOpacity>
                        <Text
                            style={styles.haveAccount}
                            onPress={() => navigation.navigate('Login')}>
                            Já possui conta? Clique aqui.
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50 
    },
    imageLogo: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    formContainer: {
        width: '100%', 
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
        paddingBottom: 20 
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
        padding: 20,
        alignSelf: 'center' 
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
    haveAccount: {
        color: '#007bff',
        fontSize: 14,
        marginBottom: 10
    }
});