import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../../services/api';

export default function PaymentSponsor({ route }) {
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
      value: donationValue,
      child: '66298b07e5052d2575309bb5',
      sponsor: '6644bc807050a2d8815b25e7'
  })
      .then(response => {
          if (response.data.token) {
             
          } 
      });
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

  const handleCepChange = (text) => {
    setCep(text.replace(/[^0-9]/g, ''));
  };

  const handleNumberChange = (text) => {
    setNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleStringToNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setDonationValue(numericValue);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Pagamento</Text>
      <Text style={styles.subtitle}>Forneça os dados de pagamento para confirmar o apadrinhamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor da doação"
        keyboardType="numeric"
        value={donationValue}
        onChangeText={handleStringToNumberChange}
      />


      <TextInput
        style={styles.input}
        placeholder="Número do Cartão"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
      />

      <View style={styles.inline}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Data de Validade (MM/YY)"
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={handleExpiryDateChange}
        />

        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 10 }]}
          placeholder="CVV"
          keyboardType="numeric"
          value={cvv}
          onChangeText={handleCvvChange}
        />

      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome no Cartão"
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={styles.subtitle}>Endereço de Cobrança</Text>

      <TextInput
        style={styles.input}
        placeholder="CEP"
        keyboardType="numeric"
        value={cep}
        type={'cep'}
        onChangeText={handleCepChange}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Logradouro"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        keyboardType="numeric"
        value={number}
        onChangeText={handleNumberChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={complement}
        onChangeText={setComplement}
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Confirmar Dados</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inline: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
