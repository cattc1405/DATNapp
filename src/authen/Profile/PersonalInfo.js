import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PersonalInfo = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headView}>
        <Image
          style={styles.redFoodBgr}
          source={require('../../../assets/images/redFoodBgr.png')}
        />
        <Text style={styles.title}>Personal Info</Text>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/BackWhite.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>John</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>JohnDoe@gmail.com</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>+090646464</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>198 P.9 Q.10</Text>

        <Text style={styles.label}>Delivery address:</Text>
        <Text style={styles.value}>+ Contact 1: 090646464 - 198 P.9 Q.10</Text>
        <Text style={styles.value}>+ Contact 2: 090646464 - 198 P.10 Q.11</Text>

        <Text style={styles.contactLabel}>Contact</Text>
        <View style={styles.contactInputContainer}>
          <TextInput
            style={styles.contactInput}
            placeholder="090308070 - 198 P.9 Q.10"
            placeholderTextColor="#979DA3"
          />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'relative',
    marginTop: 20,
  },
  redFoodBgr: {
    width: '100%',
    height: 210,
    position: 'absolute',
  },
  iconBack: {
    position: 'absolute',
    left: 20,
    top: '100%',
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'nunitoSan',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#CBCED1',
    marginTop: 10,
    fontWeight: '900',
    fontFamily: 'nunitoSan',
  },
  value: {
    fontSize: 16,
    color: '#827E7E',
    fontWeight: '900',
    marginTop: 5,
    fontFamily: 'nunitoSan',
  },
  contactInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  contactLabel: {
    fontSize: 8.5,
    color: '#F55F44',
    fontWeight: '800',
    marginTop: 5,
    fontFamily: 'nunitoSan',
  },
  contactInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default PersonalInfo;
