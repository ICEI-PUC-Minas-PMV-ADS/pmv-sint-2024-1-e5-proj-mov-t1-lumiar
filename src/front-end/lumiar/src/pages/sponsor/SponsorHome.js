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
import * as ImagePicker from 'expo-image-picker'
import { Appbar, Menu } from 'react-native-paper';
import { firebase } from '../../../config'
import * as FileSystem from 'expo-file-system'
import api from '../../services/api';



export default function SponsorHome({ route }) {
  const navigation = useNavigation();
  const userId = route.params.userId;

  const [institutions, setInstitutions] = useState([]);
  const [images, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

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

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('InstitutionHome', {
      userId: item._id, institutionName: item.name
    })}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.address}>{item.address.street}</Text>
        <Text>{item.address.district} - {item.address.state}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content style={styles.titleContainer} title="Instituições" />
        <Appbar.Action icon="menu" onPress={() => setMenuVisible(!menuVisible)} />
      </Appbar.Header>

      {menuVisible &&
        <View style={styles.menu}>
          <Menu.Item leadingIcon="account-circle-outline" onPress={() => navigation.navigate('ProfileSponsor', { id: userId })} title="Perfil" />
          <Menu.Item leadingIcon="logout" onPress={() => navigation.navigate('Login')} title="Sair" />
        </View>
      }

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
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  address: {
    marginTop: 10,
  },
  menu: {
    backgroundColor: '#FFF',
    width: '50%',
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: 90,
    right: 40,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    borderRadius: 5
  }
})
