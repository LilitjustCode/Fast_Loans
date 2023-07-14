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
import DoneIcon from '../../assets/svg/done_icon';
import FooterBlock from '../footer/Footer';

export default function App({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Image
            style={{width: 34, height: 34}}
            source={require('../../assets/img/avatar_icon.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{paddingHorizontal: 16}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 120,
          }}>
          <DoneIcon />
          <Text style={styles.doneText}>
            Ваша заявка на рассмотрении. В ближайшее время с Вами свяжется
            оператор!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DoneScreen')}
            style={[styles.bigButton, {marginTop: 120}]}>
            <Text style={styles.bigbtntxt}>Продолжить</Text>
          </TouchableOpacity>
        </View>
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

  doneText: {
    fontSize: 18,
    color: '#1B1B1B',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '500',
  },
});
