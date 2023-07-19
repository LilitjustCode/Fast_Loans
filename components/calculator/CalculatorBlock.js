import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  NativeModules,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
// import RangeSlider from 'rn-range-slider';
import React, {useEffect, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation, show}) {
  const [fromValue, setFromValue] = useState(0);
  const [myArray, setMyArray] = useState([]);
  const store = async fromValues => {
    try {
      await AsyncStorage.setItem('price', String(fromValues));
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  useEffect(() => {
    navigation.addListener('blur', () => {
      setFromValue(0);
    });
  }, []);


  
  return (
    <View style={styles.calculatorHeader}>
      <View style={styles.calculatorBlock}>
        <Text style={styles.calculatorText}>Сумма займа</Text>
        <Text style={styles.priceText}>{fromValue} ₽</Text>
        <Slider
          value={fromValue}
          onValueChange={value => {
            setFromValue(Number(value).toFixed(0));
            value > 0 ? store(Number(value).toFixed(0)) : store(0);
          }}
          thumbTintColor={'#466AE5'}
          maximumTrackTintColor={'#3C3C432E'}
          minimumTrackTintColor="#466AE5"
          maximumValue={30000}
          minimumValue={0}
        />
        <View style={styles.minmaxBlock}>
          <Text>0</Text>
          <Text>30000</Text>
        </View>
      </View>
      {fromValue == 0 && show == 'yes' ? (
        <Text style={styles.errorText}>Обязательно к заполнению</Text>
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  calculatorHeader: {
    width: '100%',
    marginTop: 20,
  },

  headerText: {
    color: '#1B1B1B',
    fontSize: 27,
    fontWeight: '600',
  },
  calculatorBlock: {
    width: '100%',
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    // height: 174,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  calculatorText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  priceText: {
    color: '#000000',
    fontSize: 30,
    marginTop: 5,
    fontWeight: '500',
  },
  slider: {
    width: 390,
    height: 40,
  },
  minmaxBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    marginTop: 5,
    marginLeft: 5,
    color: 'red',
  },
});
