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
  Dimensions,
} from 'react-native';
import FooterBlock from '../footer/Footer';
import React, {useEffect, useState} from 'react';
import CommentIcon from '../../assets/svg/comment';
import ArrowIcon from '../../assets/svg/arrow_svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function App({navigation}) {
  const [price, setPrice] = useState('');
  const [showFooter, setShowFooter] = useState(true);
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    const getMess = async () => {
      try {
        const vaalll = await AsyncStorage.getItem('history');
        if (vaalll !== null) {
          setHistoryArray(vaalll);
        }
      } catch (error) {}
    };
    getMess();
  });

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
        <Text style={styles.headerText}>История займов</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 16}}>
        {historyArray.length > 0 ? (
          <View>
            <View style={styles.headerBlock}>
              <Text style={styles.headerName}>Дата</Text>
              <Text style={styles.headerName}>Сумма</Text>
              <Text style={styles.headerName}>Статус</Text>
            </View>
            {JSON.parse(historyArray)?.map((value, index) => {
              return (
                <View key={index} style={styles.arrayblock}>
                  <Text style={styles.mainText}>{value.date}</Text>
                  <Text style={styles.mainText}>{value.prices} руб</Text>
                  <Text style={styles.mainText}>Рассмотрение</Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={styles.textdesc}>
            В данный момент у вас нет заявок на займ.
          </Text>
        )}
      </ScrollView>

      {showFooter && <FooterBlock navigation={navigation} />}
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
    // marginBottom: 20,
  },
  headerName: {
    color: 'white',
    fontSize: windowWidth < 392 ? 16 : 18,
    fontWeight: '500',
  },
  arrayblock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 6,
    // paddingVertical: 10,
  },
  mainText: {
    textAlign: 'center',
    fontSize: windowWidth < 392 ? 14 : 16,
    fontWeight: '500',
    color: '#1B1B1B',
  },
});
