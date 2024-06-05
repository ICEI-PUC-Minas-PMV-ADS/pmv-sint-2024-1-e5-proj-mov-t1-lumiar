import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeleteDialog from "../../components/deleteDialog/deleteDialog";
import { KidModal } from "../../components/modal";
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

export default function InstitutionHome({ route }) {
  const navigation = useNavigation();
  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const [children, setChildren] = useState([]);
  const userId = route.params.userId;
  const canEdit = route.params.canEdit;
  const [visible, setVisible] = React.useState(false);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showDialog = (childId) => {
    setSelectedChildId(childId)
    setVisible(true)
  }

  const hideDialog = () => {
    setVisible(false)
    setSelectedChildId(null)
  }

  const showModal = (childId) => {
    setSelectedChildId(childId);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const getChildrenList = async () => {
    api.get(`child/institution/${userId}`).then(({ data }) => {
      setChildren(data)
    });
  }

  const deleteChild = async () => {
    try {
      await api.delete(`child/${selectedChildId}`, {})
      setChildren(children.filter((child) => child._id !== selectedChildId))
    } catch (error) {
      console.error('Failed to delete child:', error)
    } finally {
      hideDialog()
    }
  }

  useEffect(() => {
    getChildrenList();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => !canEdit && showModal(item._id)} >
      <View style={styles.card}>
        {/* <Image source={item.image} style={styles.image} /> */}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.age}>{item.age} anos</Text>
        <Text>{item.description}</Text>

        {canEdit && (

          <View style={styles.buttonContainer}>
            <Button style={styles.button} buttonColor="#C693C6" textColor="#FFF">
              Editar
            </Button>

            <Button
              style={styles.button}
              buttonColor="#B52C2C"
              textColor="#FFF"
              onPress={() => showDialog(item._id)}
            >
              Apagar
            </Button>

            <Button style={styles.button} onPress={() => navigation.navigate('ChildRegister', {
              userId: userId
            })} >Add criança</Button>

          </View>
        )}
      </View>


    </TouchableOpacity>

  );

  const selectedItem = children.find(child => child._id === selectedChildId) || {};


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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />

      <DeleteDialog
        visible={visible}
        onCancel={hideDialog}
        onConfirm={deleteChild}
      />


      <KidModal
        onClose={hideModal}
        isVisible={modalVisible}
        item={selectedItem}
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
    fontWeight: '500',
  },
  age: {
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: 100,
    borderRadius: 50,
    borderColor: '#C693C6',
    marginLeft: 5,
  },
  icon: {
    color: '#000',
  },
  list: {
    paddingTop: 20,
  },
})
