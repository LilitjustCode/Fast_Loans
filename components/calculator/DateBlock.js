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
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {id: 1, text: '1 мес'},
  {id: 2, text: '2 мес'},
  {id: 3, text: '3 мес'},
  {id: 4, text: '4 мес'},
  {id: 5, text: '5 мес'},
  {id: 6, text: '6 мес'},
];

export default function App() {
  [active, setActive] = useState(false);
  [txts, setTxt] = useState('');

  const store = async text => {
    try {
      await AsyncStorage.setItem('month', text);
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.calculatorHeader}>
      <Text style={styles.headerText}>Выберете срок:</Text>
      <View style={styles.calculatorBlock}>
        <ScrollView horizontal={true}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {data.map((value, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setTxt(value.text);
                    store(value.text);
                  }}
                  style={
                    txts === value.text ? styles.active : styles.priceBlock
                  }
                  key={index}>
                  <Text
                    style={
                      txts === value.text ? styles.activeText : styles.priceText
                    }>
                    {value.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
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
    fontSize: 18,
    fontWeight: '600',
  },
  calculatorBlock: {
    width: '100%',
    backgroundColor: '#2730461F',
    borderRadius: 20,
    height: 92,
    marginTop: 20,
    justifyContent: 'center',
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
  priceText: {
    color: '#757575',
    fontSize: 20,
    fontWeight: '500',
  },
  priceBlock: {
    padding: 10,
  },
  active: {
    backgroundColor: '#F3F3F3',
    height: 44,
    width: 142,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    textAlign: 'center',
    color: '#466AE5',
    fontSize: 30,
    fontWeight: '600',
  },
});
