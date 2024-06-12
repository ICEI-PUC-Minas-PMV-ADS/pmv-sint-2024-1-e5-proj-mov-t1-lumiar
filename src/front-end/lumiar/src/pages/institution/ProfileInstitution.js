import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../config';
import * as FileSystem from 'expo-file-system';
import { FAB } from 'react-native-paper';
import api from '../../services/api';

export default function ProfileInstitution({ route }) {
    const id = route.params.id;
    const [institution, setInstitution] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const navigation = useNavigation();

    const uploadMediaFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })
        if (!result.cancelled) {
            setImage(result.assets[0].uri)
        }

        //     const uri = result.assets[0].uri;
        //     setImage(uri);
        //     console.log(result);

        //     setUploading(true);
        //     const response = await fetch(uri);
        //     const blob = await response.blob();

        //     const fileInfo = await FileSystem.getInfoAsync(uri);
        //     const fileName = fileInfo.uri.split('/').pop();

        //     const ref = firebase.storage().ref().child(fileName);

        //     const snapshot = await ref.put(blob);
        //     const urlToUpload = await snapshot.ref.getDownloadURL();
        //     console.log(urlToUpload);

        //     setUploading(false);
        //     console.log('Image uploaded to firebase.');

    };

    useEffect(() => {
        const getInstitution = async () => {
            try {
                if (id) {
                    const response = await api.get(`institution/${id}`);
                    setInstitution(response.data);
                } else {
                    console.error("No ID provided");
                }
            } catch (error) {
                console.error("Failed to fetch institution data:", error);
            }
        };
        getInstitution();
    }, [id]);

    return (


        <View style={styles.main}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content style={styles.titleContainer} title="Perfil" />
            </Appbar.Header>

            {institution ? (
                <View style={styles.container}>

                    {institution.image ? (
                        <View style={styles.imagePickerContainer}>
                            <Image source={{ uri: institution.image }} style={styles.profileImage} />
                            <FAB
                                icon="image-edit"
                                color='#000'
                                style={styles.fab}
                                size='small'
                                onPress={uploadMediaFile}
                            />
                        </View>


                    ) : (
                        <Image source={require('../../../assets/user.png')} style={styles.profileImage} />
                    )}


                    <Text style={styles.greetingText}>Olá, {institution.name}</Text>

                    <TouchableOpacity style={styles.button}>
                        <FontAwesome name="user" size={20} color="white" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Informações da instituição</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <FontAwesome name="child" size={20} color="white" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Lista de crianças</Text>
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
            ) : (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>

            )}


        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginBottom: 10,
    },
    imagePickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 20,
        marginBottom: 20,
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: 20
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
    fab: {
        position: 'absolute',
        right: 0,
        top: 110,
        backgroundColor: '#D9D9D9',
        borderRadius: '50'
    },
});
