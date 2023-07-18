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
import FooterBlock from '../footer/Footer';
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneSvg from '../../assets/svg/phone';
import MailIcon from '../../assets/svg/Email';
import Bell from '../../assets/svg/Bell';
import Remove from '../../assets/svg/Remove';
import {AuthContext} from '../AuthContext/context';
import Sign from '../../assets/svg/SignOut';

import {Switch} from 'react-native-switch';

export default function App({navigation}) {
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const authContext = useContext(AuthContext);

  const [mail, setMail] = useState('');

  const [val, setVal] = useState(true);
  const [token, setToken] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneDisableButton, setPhoneDisableButton] = useState(false);
  const [show, setShow] = useState(true);

  const phoneValidation = val => {
    let x = val
      .replace(/\D/g, '')
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    let myPhone = !x[2]
      ? '+7 ' + (x[1] !== '7' ? x[1] : '')
      : !x[3]
      ? '+7 (' + x[2]
      : '+7 (' +
        x[2] +
        ') ' +
        (x[3] ? x[3] : '') +
        (x[4] ? ' - ' + x[4] : '') +
        (x[5] ? ' - ' + x[5] : '');

    const isValid = validatePhoneNumber(myPhone);
    setPhoneDisableButton(isValid);
    setPhone(myPhone);
  };

  const validatePhoneNumber = phoneNumber => {
    let regex = /^([789]\d{10})$/;
    let newPhone = phoneNumber.replace(/\D/g, '');
    return regex.test(newPhone);
  };

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem('userToken');
      authContext.signOut();
    } catch (exception) {
      return false;
    }
  };

  const store = async () => {
    try {
      await AsyncStorage.setItem('numberPhone', phone);
      await AsyncStorage.setItem('mail', mail);
    } catch (error) {
      // Error saving data
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        const phh = await AsyncStorage.getItem('numberPhone');
        const mailss = await AsyncStorage.getItem('mail');
        setPhone(phh);
        setMail(mailss);
        setToken(value);
      } catch (exception) {
        return false;
      }
    };
    getToken();
  }, []);

  console.log(phone, 'jdk');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <View style={styles.containerHeader}>
          <TouchableOpacity>
            <Image
              style={{width: 34, height: 34}}
              source={require('../../assets/img/avatar_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Профиль</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 16, marginTop: 20}}>
        <View style={styles.block}>
          <PhoneSvg />
          <Text style={styles.txt}>Номер телефона</Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={text => {
            phoneValidation(text);
            store();
          }}
          placeholder="+7 999 999 99 99"
          placeholderTextColor={'#1B1B1B80'}
          keyboardType="phone-pad"
          style={[styles.input]}
          onFocus={() => setShow(false)}
          onBlur={() => setShow(true)}
        />
        <View style={styles.block}>
          <MailIcon />
          <Text style={styles.txt}>Электронная почта</Text>
        </View>
        <TextInput
          placeholder="Добавить..."
          placeholderTextColor={'#1B1B1B80'}
          style={[styles.input]}
          value={mail}
          onChangeText={text => {
            setMail(text);
            store();
          }}
          onFocus={() => setShow(false)}
          onBlur={() => setShow(true)}
        />
        <View style={styles.push}>
          <View style={styles.block}>
            <Bell />
            <Text style={styles.txt}>Push уведомления</Text>
          </View>
          <View style={{paddingTop: 20}}>
            <Switch
              value={val}
              onValueChange={() => setVal(!val)}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={30}
              barHeight={30}
              circleBorderWidth={0}
              backgroundActive={'#466AE5'}
              backgroundInactive={'rgba(70, 106, 229, 0.30)'}
              circleActiveColor={'white'}
              circleInActiveColor={'white'}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              outerCircleStyle={{}}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={30}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={styles.block}>
          <Remove />
          <Text style={styles.txt}>Удалить аккаунт</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={styles.block}>
          <Sign />
          <Text style={styles.txt}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>
      {show && <FooterBlock navigation={navigation} />}
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
    marginTop: 40,
  },
  headerText: {
    color: '#1B1B1B',
    fontSize: 27,
    fontWeight: '600',
  },
  input: {
    height: 52,
    width: '80%',
    borderRadius: 12,
    backgroundColor: '#466AE5',
    paddingHorizontal: 10,
    color: 'white',
  },

  textdesc: {
    color: '#1B1B1B',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 150,
  },
  messageBlock: {
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerBlock: {
    width: '100%',
    backgroundColor: '#466AE5',
    borderRadius: 10,
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 38,
    paddingVertical: 10,
  },
  headerName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1B1B1B',
    marginLeft: 12,
  },
  input: {
    height: 51,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  push: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
