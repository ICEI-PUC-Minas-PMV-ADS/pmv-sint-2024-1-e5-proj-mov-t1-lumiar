import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileSponsor() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Image source={require('../../../assets/user.png')} style={styles.profileImage} />

            <Text style={styles.greetingText}>Olá, [nome]</Text>

            <TouchableOpacity style={styles.button}>
                <FontAwesome name="user" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Informações Pessoais</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <FontAwesome name="graduation-cap" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Área do Padrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <FontAwesome name="lock" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <FontAwesome name="sign-out" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    greetingText: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        marginTop: 10,
        padding: 15,
        backgroundColor: '#C693C6',
        borderRadius: 10,
    },
    buttonText: {

        color: 'white'
    },
    buttonIcon: {
        marginRight: 10,
    },
});