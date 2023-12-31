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
import React, {useEffect, useState, useRef} from 'react';
import CommentIcon from '../../assets/svg/comment';
import ArrowIcon from '../../assets/svg/arrow_svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {
    message: 'Вы можете задать нам вопрос и мы ответим в ближайшее время!',
    owner_id: 1,
  },
];

export default function App({navigation}) {
  const [mess, setMess] = useState('');
  const [hide, setHide] = useState(true);
  const [show, setShow] = useState(false);
  const [messStorage, setMessStorage] = useState('');
  const [showView, setShowView] = useState(false);
  const [array, setArray] = useState(data);
  const scrollViewRef = useRef();
  const store = async () => {
    try {
      if (mess !== '') {
        await AsyncStorage.setItem('message', mess);
      }
    } catch (error) {
      // Error saving data
    }
  };

  const appendVew = () => {
    if (!showView) {
      // Show the view initially
      timeout = setTimeout(() => {
        setShowView(true); // Hide the view after 4 seconds
      }, 4000);
    }
  };

  useEffect(() => {
    const getMess = async () => {
      try {
        const value = await AsyncStorage.getItem('message');
        if (value !== null) {
          setMessStorage(value);
        }
      } catch (error) {}
    };
    getMess();
  });

  const sendMess = mess => {
    if (mess.length > 0) {
      let arr = array;
      arr.push({owner_id: 2, message: mess});
      setArray(arr);
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

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
        <Text style={styles.headerText}>Поддержка</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={{paddingHorizontal: 16}}>
        <View style={{marginTop: 20, paddingBottom: 50}}>
          {array.map((value, index) => {
            return value.owner_id == 1 ? (
              <View key={index} style={styles.firstMess}>
                <View style={styles.mainMess}>
                  <Image
                    style={styles.imageuser}
                    source={require('../../assets/Frame257.png')}
                  />
                  <View style={styles.messageBlockComm}>
                    <Text style={styles.messTextComm}>{value.message}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View key={index} style={styles.secondMess}>
                <View style={styles.messageBlockMe}>
                  <Text style={styles.messTextMe}>{value.message}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.messageBlock}>
        <TextInput
          value={mess}
          onChangeText={text => setMess(text)}
          placeholder="Сообщение..."
          placeholderTextColor={'white'}
          onFocus={() => setHide(false)}
          onBlur={() => setHide(true)}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            sendMess(mess);
            setMess('');
            if (array.length == 2) {
              setShow(true);

              setTimeout(() => {
                let arr = array;
                arr.push({
                  owner_id: 1,
                  message:
                    'В настоящий момент все операторы заняты, пожалуйста подождите.',
                });
                setArray(arr);
                setShow(false);
              }, 4000);
            }

            appendVew();
          }}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
      {hide ? <FooterBlock navigation={navigation} /> : ''}
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
  firstMess: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 15,
  },
  secondMess: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageuser: {
    width: 60,
    height: 60,
  },
  mainMess: {
    flexDirection: 'row',
  },
  messageBlockComm: {
    width: 262,
    marginLeft: 5,
    backgroundColor: 'rgba(70, 106, 229, 0.40)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  messTextComm: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  messageBlockMe: {
    width: 262,
    // marginLeft: 5,
    // height: 100,
    backgroundColor: '#3580E6',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 5,
  },
  messTextMe: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
});
