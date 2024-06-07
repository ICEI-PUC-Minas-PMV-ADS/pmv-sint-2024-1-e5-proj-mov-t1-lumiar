import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Button, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Appbar, TextInput } from 'react-native-paper';
import { firebase } from '../../../config'
import * as FileSystem from 'expo-file-system'

import api from '../../services/api';
import { useNavigation } from '@react-navigation/native'


export default function ChildRegister({ route }) {
    const navigation = useNavigation();
    const userId = route.params.userId;
    const child = route.params.child;

    const [images, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [cpf, setCpf] = useState('');
    const [description, setDescription] = useState('');
    const [cep, setCep] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState(null);


    useEffect(() => {
        if (child) {
            setImage(child.image)
            setName(child.name);
            setBirthDate(child.birthDate);
            setCpf(child.cpf);
            setDescription(child.description);
            setCep(child.address.cep);
            setState(child.address.state);
            setCity(child.address.district);
            setAddress(child.address.street);
        }
    }, [child]);

    const calculateAge = (date) => {
        const [day, month, year] = date.split('/').map(Number);
        const today = new Date();
        let age = today.getFullYear() - year;
        const monthDiff = today.getMonth() + 1 - month;
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
            age--;
        }
        return age;
    };

    const handleBirthDate = (text) => {
        const formattedText = text.replace(/[^0-9]/g, '');
        let formattedDate = formattedText;
        if (formattedText.length > 2 && formattedText.length <= 4) {
            formattedDate = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
        } else if (formattedText.length > 4) {
            formattedDate = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`;
        }
        setBirthDate(formattedDate);

        if (formattedDate.length === 10) {
            const calculatedAge = calculateAge(formattedDate);
            setAge(calculatedAge);
        } else {
            setAge(null);
        }
    };

    const handleCepChange = (text) => {
        const formattedText = text.replace(/[^0-9]/g, '');
        let formattedCep = formattedText;
        if (formattedText.length > 5) {
            formattedCep = `${formattedText.slice(0, 5)}-${formattedText.slice(5, 8)}`;
        }
        setCep(formattedCep);
    };

    const handleCpfChange = (text) => {
        const formattedText = text
            .replace(/\D/g, '')
            .slice(0, 11)
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            .replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3')
            .replace(/(\d{3})(\d)/, '$1.$2');

        setCpf(formattedText);
    };

    const uploadMediaFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })
        if (!result.cancelled) {
            setImage(result.assets[0].uri)
            console.log(result)
        }
    }

    const uploadImage = async () => {
        setUploading(true)

        try {
            const response = await fetch(images)
            const blob = await response.blob()

            const fileInfo = await FileSystem.getInfoAsync(images)
            const fileName = fileInfo.uri.split('/').pop()

            const ref = firebase.storage().ref().child(fileName)

            const snapshot = await ref.put(blob)
            const urlToUplouad = await snapshot.ref.getDownloadURL()
            console.log(fileInfo.uri)

            setUploading(false)
            console.log('Image uploaded to firebase.')
        } catch (error) {
            console.log(`Failed to upload image. ${error}`)
        }
    }

    const newChild = () => {
        uploadImage
        api.post("child", {
            name: name,
            age: age,
            description: description,
            institution: userId,
            address: {
                street: address,
                district: city,
                state: state,
                country: 'Brasil',
                cep: cep,
            },
            image: images
        })
            .then((response) => {
                if (response.data) {
                    setVisible = true;
                    navigation.navigate('InstitutionHome', { userId: userId })
                }
            });
    };

    const updateChild = () => {
        uploadImage
        api.put(`child/${child._id}`, {
            name: name,
            age: 7,
            description: description,
            institution: userId,
            address: {
                street: address,
                district: city,
                state: state,
                country: 'Brasil',
                cep: cep,
            },
            image: images
        })
            .then((response) => {
                if (response.data) {
                    setVisible = true;
                    navigation.navigate('InstitutionHome', { userId: userId })
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content style={styles.titleContainer} title="Dados da Criança" />
                    </Appbar.Header>

                    {!images &&
                        <View style={styles.imagePickerContainer} backgroundColor={'#D9D9D9'}>
                            <Button title="Adicionar Imagem" onPress={uploadMediaFile} />
                        </View>
                    }
                    {images &&
                        <View style={styles.imagePickerContainer}>
                            <Button title="Trocar Imagem" onPress={uploadMediaFile} />
                            <Image source={{ uri: images }} style={styles.image} />
                        </View>
                    }

                    <Text style={styles.subtitle}>Informações Pessoais</Text>
                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="Nome"
                        keyboardType="text"
                        value={name}
                        onChangeText={setName}
                    />


                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="Data de nascimento"
                        keyboardType="numeric"
                        value={birthDate}
                        onChangeText={handleBirthDate}
                    />

                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="CPF"
                        keyboardType='numeric'
                        value={cpf}
                        onChangeText={handleCpfChange}
                    />

                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="Descrição"
                        keyboardType="text"
                        multiline={true}
                        height={200}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Text style={styles.subtitle}>Endereço</Text>

                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="CEP"
                        keyboardType="numeric"
                        value={cep}
                        onChangeText={handleCepChange}
                    />

                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="Estado"
                        value={state}
                        onChangeText={setState}
                    />
                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="Cidade"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        style={styles.input}
                        activeUnderlineColor={'#C693C6'}
                        label="Logradouro"
                        value={address}
                        onChangeText={setAddress}
                    />
                    {!child &&
                        <TouchableOpacity style={styles.button} onPress={newChild}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    }

                    {child &&
                        <TouchableOpacity style={styles.button} onPress={updateChild}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#FFF'
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    icon: {
        color: '#000',
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    subtitle: {
        fontSize: 18,
        marginTop: 20
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
    inline: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#51782C',
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },

    imagePickerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    image: {
        width: 350,
        height: 200,
        alignItems: 'center'
    },
});