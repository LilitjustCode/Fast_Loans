import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import CalculatorHeader from './CalculatorBlock';
import DateBlock from './DateBlock';
import {useState, useEffect} from 'react';
import FooterBlock from '../footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import moment from 'moment/moment';

export default function App({navigation}) {
  const [name, setName] = useState('');
  // const [date, setDate] = useState(datestore != null ? datestore : '');
  const [show, setShow] = useState(false);
  const [namestore, setNamestore] = useState('');
  const [datestore, setDatestore] = useState('');
  const [month, setMonth] = useState('');
  const [price, setPrice] = useState('');
  const [showFooter, setShowFooter] = useState(true);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [openPicker, setOpenPicker] = useState(false);
  const [dateIsSelected, setDateIsSelected] = useState(false);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setName('');
      setText('');
    });
  }, [navigation]);

  const getMess = async () => {
    const monthValue = await AsyncStorage.getItem('month');
    const priceValue = await AsyncStorage.getItem('price');
    try {
      setMonth(monthValue);
      setPrice(priceValue);
    } catch (error) {}
  };

  getMess();

  const onChangeText = value => {
    setDate(value);
    setDateIsSelected(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{paddingHorizontal: 16}}>
        <View>
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
        <CalculatorHeader navigation={navigation} show={show ? 'yes' : 'no'} />

        <DateBlock navigation={navigation} show={show ? 'yes' : 'no'} />

        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Фамилия Имя Отчество"
          placeholderTextColor={'#1B1B1B80'}
          onFocus={() => setShowFooter(false)}
          onBlur={() => setShowFooter(true)}
          style={[
            styles.input,
            name.length == 0 && show ? {borderColor: 'red'} : '',
          ]}
        />
        {name.length == 0 && show ? (
          <Text style={styles.errorText}>Обязательно к заполнению</Text>
        ) : (
          ''
        )}

        <TouchableOpacity
          style={[styles.input, text == '' && show ? {borderColor: 'red'} : '']}
          onPress={() => setOpenPicker(true)}>
          <Text style={styles.datePickText}>
            {text ? text : 'Дата рождения'}
          </Text>
          <DatePicker
            modal
            open={openPicker}
            title={'Дата рождения'}
            date={date}
            mode={'date'}
            cancelText={'отменить'}
            confirmText={'подтвердить'}
            maximumDate={new Date()}
            onConfirm={date => {
              setOpenPicker(false);
              onChangeText(date);
              let mytext = date;
              mytext = moment(mytext).format('M.D.YYYY');
              console.log(mytext);
              setText(`${mytext}`);
              // store();
            }}
            onCancel={() => {
              setOpenPicker(false);
            }}
          />
        </TouchableOpacity>
        {text == '' && show ? (
          <Text style={styles.errorText}>Обязательно к заполнению</Text>
        ) : (
          ''
        )}
        <TouchableOpacity
          onPress={() => {
            if (name.length == 0 && text.length == 0) {
              setShow(true);
            } else {
              navigation.navigate('DoneScreen');
              setShow(false);
            }
          }}
          style={styles.bigButton}>
          <Text style={styles.bigbtntxt}>Отправить заявку</Text>
        </TouchableOpacity>
      </ScrollView>
      {showFooter ? <FooterBlock navigation={navigation} /> : ''}
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
    color: '#1B1B1B80',
    // alignItems: 'center',
    justifyContent: 'center',
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
  datePickText: {
    color: '#1B1B1B80',
  },
});
