import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';

export default function InstitutionList() {
  const navigation = useNavigation();

  const [institutions, setInstitutions] = useState([]);

  const getInstitution = async () => {
    const response = await api.get('institution')
    console.log({ response })
    setInstitutions(response.data)
  }


  useEffect(() => {
    getInstitution()
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* <Image source={item.image} style={styles.image} /> */}
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.address}>{item.address.street}</Text>
      <Text>{item.address.district} - {item.address.state}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Instituições</Text>
          <Text style={styles.subtitle}>Selecione para saber mais</Text>
        </View>
      </View>

      <FlatList
        data={institutions}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
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
  subtitle: {
    fontSize: 18,
  },
  list: {
    paddingTop: 20,
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  icon: {
    color: '#000',
  },
  address: {
    marginTop: 10
  }
});
