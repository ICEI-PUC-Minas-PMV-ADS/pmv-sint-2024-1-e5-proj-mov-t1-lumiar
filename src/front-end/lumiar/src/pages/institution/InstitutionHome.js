import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, Appbar, FAB, useTheme, Icon } from 'react-native-paper';
import DeleteDialog from "../../components/deleteDialog/deleteDialog";
import { KidModal } from "../../components/modal";
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';



import api from '../../services/api'

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 100;

export default function InstitutionHome({ route }) {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const navigation = useNavigation();
  // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const [children, setChildren] = useState([]);
  const userId = route.params.userId;
  const canEdit = route.params.canEdit;
  const institutionName = route.params.institutionName;
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

  useFocusEffect(
    React.useCallback(() => {
        getChildrenList();
    }, [])
);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => !canEdit && showModal(item._id)} >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.age}>{item.age} anos</Text>
        <Text numberOfLines={3}>{item.description}</Text>

        {canEdit && (

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              buttonColor="#BAB7B7"
              textColor="#FFF"
              onPress={() => navigation.navigate('ChildRegister', {
                child: item,
                userId: userId
              })}
            >
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
          </View>
        )}
      </View>


    </TouchableOpacity>

  );

  const selectedItem = children.find(child => child._id === selectedChildId) || {};

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        {!institutionName &&
          <Appbar.Content style={styles.titleContainer} title="Crianças Cadastradas" />
        }
        {institutionName &&
          <Appbar.Content style={styles.titleContainer} title={institutionName} />
        }
      </Appbar.Header>

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

      {canEdit &&
        <Appbar
          style={[
            styles.bottom,

          ]}
          safeAreaInsets={{ bottom }}
        > 
          <FAB
            mode="elevated"
            size="medium"
            icon="plus"
            onPress={() => navigation.navigate('ChildRegister', {
              userId: userId
            })}
            style={[
              styles.fab,
              { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
            ]}
          />
        </Appbar>
      }

    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
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
  bottom: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: '50'
  },
})
