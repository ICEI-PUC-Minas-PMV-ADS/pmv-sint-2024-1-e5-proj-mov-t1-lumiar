import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Switch } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import api from '../services/api';

export default function Login() {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const login = () => {
        if (!isSwitchOn) {
            api.post("auth/sponsor/login", {
                email: userName,
                password: password,
            })
                .then(response => {
                    if (response.data.token) {
                        navigation.navigate('SponsorHome',  { userId: response.data.userId });
                    } else {
                        console.error('Login failed: ', response.data.message);
                    }
                });
        }
        if (isSwitchOn) {
            api.post("auth/institution/login", {
                email: userName,
                password: password,
            })
                .then(response => {
                    if (response.data.token) {
                        navigation.navigate('InstitutionHome', { userId: response.data.userId, canEdit: isSwitchOn });
                    } else {
                        console.error('Login failed: ', response.data.message);
                    }
                });
        }

    };

    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

            <Image
                source={require('../../assets/Lumiar_branco.png')}
                style={styles.imageLogo}
            />

            <View style={styles.formContainer}>

                <Text style={styles.loginTxt}>Login</Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Usuário"
                        value={userName}
                        onChangeText={text => setUserName(text)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Senha"
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <FontAwesome
                        name={passwordVisible ? 'eye-slash' : 'eye'}
                        size={20}
                        style={styles.passwordIcon}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                </View>

                <View style={styles.setUser}>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color='#C693C6' />
                    <Text style={styles.setUserText}>Sou instituição</Text>
                </View>



                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnLogin} onPress={() => login()} >
                    <Text style={styles.loginTextBtn}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('SetUser')}>
                    <Text style={styles.registerTextBtn}>Criar conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('EscolhaDeUser')}>
                    <Text style={styles.registerTextBtn}>Todas as paginas</Text>
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
    setUser: {
        width: '80%',
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    setUserText: {
        color: '#383839',
        marginLeft: 5,
        fontSize: 12
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