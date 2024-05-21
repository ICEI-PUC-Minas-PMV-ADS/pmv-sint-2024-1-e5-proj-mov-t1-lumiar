import React, { useEffect, useState } from "react";
import { Text, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, Avatar, Button, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';


export default function InstitutionHome() {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const [children, setChildren] = useState([]);
    const id = '664c063407a6bf702e66a166';

    useEffect(() => {
        api.get(`child/institution/${id}`).then(({ data }) => {
            setChildren(data)
        });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* <Image source={item.image} style={styles.image} /> */}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.age}>{item.age} anos</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} buttonColor="#C693C6" textColor="#FFF">Editar</Button>
                <Button style={styles.button} buttonColor="#B52C2C" textColor="#FFF">Apagar</Button>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Crianças Cadastradas</Text>
                </View>
            </View>

            <FlatList
                data={children}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                button
            />

        </View>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    titleContainer: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
    },
    name: {
        color: '#51782C',
        fontSize: 20,
        fontWeight: '500'
    },
    age: {
        marginBottom: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30
    },
    button: {
        width: 100,
        borderRadius: 50,
        borderColor: '#C693C6',
        marginLeft: 5
    },
    icon: {
        color: '#000',
    },
    list: {
        paddingTop: 20,
    },
});