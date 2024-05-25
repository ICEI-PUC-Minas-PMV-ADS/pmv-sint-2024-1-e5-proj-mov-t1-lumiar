import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../../config'
import * as FileSystem from 'expo-file-system'
import api from '../../services/api';

import { Button } from 'react-native-paper';


export default function SponsorHome({ route }) {
  const navigation = useNavigation();

  const [institutions, setInstitutions] = useState([]);
  const [images, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)


  const uploadMediaFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.assets[0].uri)
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

      setUploading(false)
      console.log('Image uploaded to firebase.')
      Alert.alert('Success', 'Image uploaded to firebase.')
    } catch (error) {
      console.log(`Failed to upload image. ${error}`)
      Alert.alert('Error', 'Failed to upload image.')
    }
  }
  const getInstitution = async () => {
    const response = await api.get('institution')
    setInstitutions(response.data)
  }

  useEffect(() => {
    getInstitution()
  }, [])

  console.log(institutions)

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* <Text style={styles.name}>{item.image}</Text> */}
      <Image source={{ uri: item.image }} style={styles.image} />
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
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
    marginTop: 10,
  },
})
