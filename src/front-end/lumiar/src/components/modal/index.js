import { View, Text, Modal, Pressable, Image, TouchableOpacity } from 'react-native'

export function KidModal({ onClose, isVisible, item = {
  image: "https://blog-leiturinha-novo.s3.us-east-1.amazonaws.com/production/uploads/2022/07/iStock-1302266351-2-1.jpg",
  age: '10',
  name: 'Lucas',
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis odio nulla, id varius nisl scelerisque ac. Suspendisse nec tortor ac enim mattis sollicitudin. Vivamus eu venenatis leo. Vivamus porttitor euismod justo ultrices sagittis. Nulla porttitor porta sem, nec efficitur orci interdum in. Aliquam maximus, mi non convallis mollis, justo velit rutrum nisi, sed bibendum nisi augue at turpis. Phasellus vitae dapibus erat. Quisque laoreet justo a arcu vulputate, eu gravida neque posuere. Suspendisse imperdiet ligula a elementum vestibulum. Nulla dignissim dictum sapien, sit amet porttitor nisi convallis id. Sed ac ornare libero. Fusce eu ultrices orci. In hac habitasse platea dictumst. Suspendisse ut congue magna, non vulputate nibh. Morbi non sapien nisl. Fusce placerat faucibus neque, vitae congue felis condimentum ac."
} }) {

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
          <View style={styles.kidImageContainer}>
            <Image
              source={item.image}
              style={styles.kidImage}
            />
          </View>
          <Text style={styles.kidSubtitle}>Um pouco da minha história</Text>
          <Text style={styles.kidText}>{item.description}</Text>
          <Pressable style={styles.button}>
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
