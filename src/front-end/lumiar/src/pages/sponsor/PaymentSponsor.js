import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api';

export default function PaymentSponsor({ route }) {
  const navigation = useNavigation();

  const [donationValue, setDonationValue] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');


  const handlePayment = () => {
    api.post("/create-donation", {
      value: parseFloat(donationValue.replace('R$ ', '').replace(',', '.')),
      child: '66298b07e5052d2575309bb5',
      sponsor: '6644bc807050a2d8815b25e7'
    })
      .then(response => {
        if (response.data.token) {

        }
      });
  };

  const handleCepChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    let formattedCep = formattedText;
    if (formattedText.length > 5) {
      formattedCep = `${formattedText.slice(0, 5)}-${formattedText.slice(5, 8)}`;
    }
    setCep(formattedCep);
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleExpiryDateChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    if (formattedText.length <= 4) {
      setExpiryDate(formattedText.replace(/(\d{2})(\d{0,2})/, '$1/$2'));
    }
  };

  const handleCvvChange = (text) => {
    setCvv(text.replace(/[^0-9]/g, '').substring(0, 3));
  };

  const handleNumberChange = (text) => {
    setNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleStringToNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setDonationValue(numericValue);
  };

  const handleDonationChange = (text) => {
    let numericText = text.replace(/\D/g, '');

    let formattedText = (parseInt(numericText, 10) / 100).toFixed(2);

    formattedText = 'R$ ' + formattedText.replace('.', ',');

    setDonationValue(formattedText);
};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content style={styles.titleContainer} title="Pagamento" />
          </Appbar.Header>
          <Text style={styles.subtitle}>Forneça os dados de pagamento para confirmar o apadrinhamento</Text>

          <TextInput
            style={styles.input}
            activeUnderlineColor={'#C693C6'}
            label="Valor da doação"
            keyboardType="numeric"
            value={donationValue}
            onChangeText={handleDonationChange}
          />


          <TextInput
            style={styles.input}
            activeUnderlineColor={'#C693C6'}
            label="Número do Cartão"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />

          <View style={styles.inline}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              activeUnderlineColor={'#C693C6'}
              label="Validade (MM/YY)"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
            />

            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 10 }]}
              activeUnderlineColor={'#C693C6'}
              label="CVV"
              keyboardType="numeric"
              value={cvv}
              onChangeText={handleCvvChange}
            />

          </View>

          <TextInput
            style={styles.input}
            activeUnderlineColor={'#C693C6'}
            label="Nome no Cartão"
            value={cardName}
            onChangeText={setCardName}
          />

          <Text style={styles.subtitle}>Endereço de Cobrança</Text>

          <TextInput
            style={styles.input}
            activeUnderlineColor={'#C693C6'}
            label="CEP"
            keyboardType="numeric"
            value={cep}
            type={'cep'}
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
          <TextInput
            style={styles.input}
            activeUnderlineColor={'#C693C6'}
            label="Número"
            keyboardType="numeric"
            value={number}
            onChangeText={handleNumberChange}
          />
          <TextInput
            style={styles.input}
            activeUnderlineColor={'#C693C6'}
            label="Complemento"
            value={complement}
            onChangeText={setComplement}
          />

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Confirmar Dados</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF'
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  input: {
    paddingHorizontal: 15,
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
});
