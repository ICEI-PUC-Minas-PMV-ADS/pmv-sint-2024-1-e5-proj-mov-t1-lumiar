import { View, Text, Modal, Pressable, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export function KidModal({ onClose, isVisible, item }) {
  const navigation = useNavigation();
  const { age = 0, name = '', description = '' } = item || {};

  const handleSponsorPress = () => {
    onClose(); 
    navigation.navigate('PaymentSponsor', {
      childId: item._id
    });
  };

  return (
    <Modal
      dismiss={onClose}
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity style={{
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)',
      }} onPress={onClose}>

        <View style={styles.modalView}>
          <Text style={styles.kidTitleName}>
            {item.name}
          </Text>
          <Text style={styles.kidAge}>{`${item.age} anos`}</Text>
          {/* <View style={styles.kidImageContainer}>
            <Image
              source={item.image}
              style={styles.kidImage}
            />
          </View> */}
          <Text style={styles.kidSubtitle}>Um pouco da minha história</Text>
          <Text style={styles.kidText}>{item.description}</Text>
          <Pressable style={styles.button} onPress={handleSponsorPress}>
            <Text style={styles.textStyle}>Apadrinhar</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal >
  );
};

const styles = {
  kidImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  kidImage: {
    width: '100%',
    height: 162,
    borderRadius: '5px',
    marginBottom: '12px'
  },
  kidTitleName: {
    color: '#51782C',
    fontSize: '20px',
    marginBottom: '8px'
  },
  kidAge: {
    color: '#000000',
    fontSize: '16px',
    marginBottom: '8px'
  },
  kidSubtitle: {
    color: '#51782C',
    fontSize: '16px',
    marginBottom: '8px'
  },
  kidText: {
    color: '#000000',
    fontSize: '13px',
    marginBottom: '8px'
  },
  modalView: {
    margin: 24,
    background: '#FFF',
    borderRadius: '5px',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: '24px',
    background: '#51782C',
    width: '180px',
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

}
