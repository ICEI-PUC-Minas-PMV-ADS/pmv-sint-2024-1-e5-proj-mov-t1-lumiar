import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const data = [
  {
    id: '1',
    name: 'BH Futuro',
    image: require('../../../assets/instituicao1.jpg'),
    description: 'O Instituto BH Futuro é um hub de inovação social com projetos culturais, esportivos e educacionais.',
    address: 'Endereço: Rua Des. Mario Matos, 578 - Serra, Belo Horizonte - MG',
  },
  {
    id: '2',
    name: 'A Associação Peter Pan',
    image: require('../../../assets/instituicao2.jpg'),
    description: 'A Associação Peter Pan (APP) nasceu da vontade de amar e de tornar melhor a vida de crianças e adolescentes com câncer. Criada em 1996, a instituição vem transformando o cenário do câncer infantojuvenil no estado do Ceará em 28 anos de história.',
    address: 'Endereço: Rua Alberto Montezuma, 350, Vila União, Fortaleza, Ceará',
  },
  {
    id: '3',
    name: 'Criança é vida',
    image: require('../../../assets/instituicao3.jpg'),
    description: 'O Instituto Criança é Vida é uma organização sem fins lucrativos que desenvolve projetos para atender ao que médicos e psicólogos consideram o básico para a prevenção de doenças e para o bom desenvolvimento de bebês, crianças e adolescentes.',
    address: 'Endereço: Rua Fernandes Moreira, 1.166, 7º andar Chácara Santo Antônio - São Paulo - SP',
  }
];

export default function InstitutionList() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.address}</Text>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
});
