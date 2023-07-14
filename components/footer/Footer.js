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

import {useState} from 'react';
import CommentIcon from '../../assets/svg/comment';

export default function App({navigation}) {
  return (
    <View style={styles.footerFirst}>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HistoryScreen')}
          style={styles.miniButton}>
          <Text style={styles.minibtnText}>Мои заявки</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CalculatorScreen')}
          style={styles.miniButton}>
          <Text style={styles.minibtnText}>Взять займ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          style={styles.styleButton}>
          <CommentIcon />
          <Text style={styles.styleBtnText}>Помощь</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  miniButton: {
    width: '30%',
    borderRadius: 15,
    backgroundColor: '#466AE5',
    height: 45,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerFirst: {
    borderTopColor: '#D9D9D9',
    borderTopWidth: 2,
  },
  styleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
  },
  minibtnText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  styleBtnText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 2,
  },
  textdesc: {
    color: '#1B1B1B',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});
