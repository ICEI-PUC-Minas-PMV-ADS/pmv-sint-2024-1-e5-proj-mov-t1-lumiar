import React from "react";
import { Text, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, View } from 'react-native';
import { Card, Avatar, Button, } from 'react-native-paper';


export default function InstitutionHome() {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View>
                    <Card style={styles.card} mode="elevated">
                        <Card.Cover source={require('../../../assets/criança1.jpg')} />
                        <Card.Content>
                            <Text style={styles.name} variant="titleLarge">Nome</Text>
                            <Text variant="bodyMedium">Texto</Text>
                        </Card.Content>

                        <Card.Actions >
                            <Button style={styles.button} buttonColor="#C693C6" textColor="#FFF">Editar</Button>
                            <Button style={styles.button} buttonColor="#B52C2C" textColor="#FFF">Apagar</Button>
                        </Card.Actions>
                    </Card>

                    <Card style={styles.card} mode="elevated">
                        <Card.Cover source={require('../../../assets/criança2.jpg')} />
                        <Card.Content>
                            <Text style={styles.name} variant="titleLarge">Nome</Text>
                            <Text variant="bodyMedium">Texto</Text>
                        </Card.Content>

                        <Card.Actions >
                            <Button style={styles.button} buttonColor="#C693C6" textColor="#FFF">Editar</Button>
                            <Button style={styles.button} buttonColor="#B52C2C" textColor="#FFF">Apagar</Button>
                        </Card.Actions>
                    </Card>

                    <Card style={styles.card} mode="elevated">
                        <Card.Cover source={require('../../../assets/criança3.jpg')} />
                        <Card.Content>
                            <Text style={styles.name} variant="titleLarge">Nome</Text>
                            <Text variant="bodyMedium">Texto</Text>
                        </Card.Content>

                        <Card.Actions >
                            <Button style={styles.button} buttonColor="#C693C6" textColor="#FFF">Editar</Button>
                            <Button style={styles.button} buttonColor="#B52C2C" textColor="#FFF">Apagar</Button>
                        </Card.Actions>
                    </Card>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );

}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        height: '100%'
    },
    card: {
        margin: 5
    },
    name: {
        color: '#51782C',
        fontSize: 20,
        fontWeight: '500'
    },
    button: {
        borderRadius: 50,
        borderColor: '#C693C6'
    }
});