import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Snackbar, TextInput } from 'react-native-paper';

import api from '../../services/api';

export default function SponsorRegistration() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleCpfChange = (text) => {
        const formattedText = text
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            .replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3')
            .replace(/(\d{3})(\d)/, '$1.$2');

        setCpf(formattedText);
    };

    const onDismissSnackBar = () => setVisible(false);

    const newSponsor = () => {
        api.post("sponsor", {
            name: name,
            email: email,
            age: 25,
            cpf: cpf,
            password: password,
            donations: {}
        })
            .then((response) => {
                if (response.data) {
                    setVisible = true;
                    navigation.navigate('Login')
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../../../assets/Lumiar_branco.png')}
                    style={styles.imageLogo}
                />
                <View style={styles.formContainer}>
                    <Text style={styles.signUpTxt}>Cadastre-se</Text>


                    <TextInput
                        style={styles.inputText}
                        activeUnderlineColor={'#C693C6'}
                        label="Nome"
                        value={name}
                        onChangeText={text => setName(text)}
                        keyboardType='default'
                    />

                    <TextInput
                        style={styles.inputText}
                        activeUnderlineColor={'#C693C6'}
                        label="E-mail"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType='email-address'
                    />

                    <TextInput
                        style={styles.inputText}
                        activeUnderlineColor={'#C693C6'}
                        label="CPF"
                        keyboardType='numeric'
                        value={cpf}
                        onChangeText={handleCpfChange}
                    />

                    <TextInput
                        style={styles.inputText}
                        activeUnderlineColor={'#C693C6'}
                        label="Idade"
                        value={age}
                        onChangeText={text => setAge(text)}
                        keyboardType='numeric'
                    />


                    <TextInput
                        style={styles.inputText}
                        activeUnderlineColor={'#C693C6'}
                        label="Senha"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        keyboardType='default'
                        secureTextEntry={!passwordVisible}
                        textContentType="oneTimeCode"

                        right={<TextInput.Icon
                            style={styles.icon}
                            icon={passwordVisible ? 'eye-off' : 'eye'}
                            size={25}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        />}
                    />

                    <TextInput
                        style={styles.inputText}
                        activeUnderlineColor={'#C693C6'}
                        label="Confirme sua senha"
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        keyboardType='default'
                        secureTextEntry={!confirmPasswordVisible}
                        textContentType="oneTimeCode"

                        right={<TextInput.Icon
                            style={styles.icon}
                            icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                            size={25}
                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        />}
                    />
                    

                    <TouchableOpacity style={styles.btnRegister} onPress={() => newSponsor()} >
                        <Text style={styles.registerTextBtn}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text
                            style={styles.haveAccount}
                            onPress={() => navigation.navigate('Login')}>
                            Já possui conta? Faça login.
                        </Text>
                    </TouchableOpacity>
                </View>

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}>
                    Conta criada com sucesso!
                </Snackbar>
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
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    formContainer: {
        width: 350,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 30,
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
    inputText: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        width: '80%'

    },
    btnRegister: {
        width: '85%',
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
    },
    icon: {
        height: '100%',
        marginTop: 45,
        alignItems: 'center'
    }
});