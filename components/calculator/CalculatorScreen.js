import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  NativeModules,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import CalculatorHeader from './CalculatorBlock';
import DateBlock from './DateBlock';
import {useState, useEffect} from 'react';
import CommentIcon from '../../assets/svg/comment';
import FooterBlock from '../footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
  const [name, setName] = useState(namestore != null ? namestore : '');
  const [date, setDate] = useState(datestore != null ? datestore : '');
  const [show, setShow] = useState(false);
  const [namestore, setNamestore] = useState('');
  const [datestore, setDatestore] = useState('');
  const [month, setMonth] = useState('');
  const [price, setPrice] = useState('');

  const store = async () => {
    try {
      await AsyncStorage.setItem('name', name);

      await AsyncStorage.setItem('date', date);
    } catch (error) {
      // Error saving data
    }
  };
  const getMess = async () => {
    const valueName = await AsyncStorage.getItem('name');
    const valuedate = await AsyncStorage.getItem('date');
    const monthValue = await AsyncStorage.getItem('month');
    const priceValue = await AsyncStorage.getItem('price');

    try {
      setNamestore(valueName);
      setDatestore(valuedate);
      setMonth(monthValue);
      setPrice(priceValue);
    } catch (error) {
      // Error retrieving data
    }
  };

  getMess();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image
              style={{width: 34, height: 34}}
              source={require('../../assets/img/avatar_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Калькулятор займа</Text>
      </View>
      <ScrollView style={{paddingHorizontal: 16}}>
        <CalculatorHeader />
        {price == null && show ? (
          <Text style={styles.errorText}>Обязательно к заполнению</Text>
        ) : (
          ''
        )}
        <DateBlock />
        {month == null && show ? (
          <Text style={styles.errorText}>Обязательно к заполнению</Text>
        ) : (
          ''
        )}
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Фамилия Имя Отчество"
          placeholderTextColor={'#1B1B1B80'}
          style={[
            styles.input,
            namestore == null && show ? {borderColor: 'red'} : '',
          ]}
        />
        {namestore == null && show ? (
          <Text style={styles.errorText}>Обязательно к заполнению</Text>
        ) : (
          ''
        )}
        <TextInput
          value={date}
          onChangeText={text => setDate(text)}
          placeholder="Дата рождения"
          placeholderTextColor={'#1B1B1B80'}
          style={[
            styles.input,
            datestore == null && show ? {borderColor: 'red'} : '',
          ]}
        />
        {datestore == null && show ? (
          <Text style={styles.errorText}>Обязательно к заполнению</Text>
        ) : (
          ''
        )}
        <TouchableOpacity
          onPress={() => {
            store();

            if (datestore == null && namestore == null) {
              setShow(true);
            }

            {
              namestore == null &&
              datestore == null &&
              price == null &&
              month == null
                ? ''
                : navigation.navigate('DoneScreen');
            }
          }}
          style={styles.bigButton}>
          <Text style={styles.bigbtntxt}>Отправить заявку</Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterBlock navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 40,
  },

  headerText: {
    color: '#1B1B1B',
    fontSize: 27,
    fontWeight: '600',
  },
  input: {
    height: 51,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  bigButton: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#466AE5',
    height: 52,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bigbtntxt: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 5,
    marginLeft: 5,
    color: 'red',
  },
});
