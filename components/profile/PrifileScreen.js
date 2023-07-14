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
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneSvg from '../../assets/svg/phone';
import MailIcon from '../../assets/svg/Email';
import Bell from '../../assets/svg/Bell';
import Remove from '../../assets/svg/Remove';
import Sign from '../../assets/svg/SignOut';
// import CustomSwitch from 'react-native-custom-switch';
import {Switch} from 'react-native-switch';

export default function App({navigation}) {
  const [price, setPrice] = useState('');
  const [val, setVal] = useState(true);

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
          placeholder="+7 999 999 99 99"
          placeholderTextColor={'#1B1B1B80'}
          keyboardType="numeric"
          style={[styles.input]}
        />
        <View style={styles.block}>
          <MailIcon />
          <Text style={styles.txt}>Электронная почта</Text>
        </View>
        <TextInput
          placeholder="Добавить..."
          placeholderTextColor={'#1B1B1B80'}
          style={[styles.input]}
        />
        <View style={styles.push}>
          <View style={styles.block}>
            <Bell />
            <Text style={styles.txt}>Push уведомления</Text>
          </View>
          {/* <CustomSwitch
            onSwitch={() => {}}
            buttonWidth={30}
            switchWidth={60}
            buttonPadding={2}
            buttonColor={'white'}
            switchBorderColor={'#F3DFA2'}
            buttonBorderColor={'white'}
            switchBackgroundColor={'rgba(70, 106, 229, 0.30)'}
           onSwitchBackgroundColor={'#BB4430'}
          /> */}
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
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}} // style for inner animated circle for what you (may) be rendering inside the circle
            outerCircleStyle={{}} // style for outer animated circle
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
        </View>
        <View style={styles.block}>
          <Remove />
          <Text style={styles.txt}>Удалить аккаунт</Text>
        </View>
        <View style={styles.block}>
          <Sign />
          <Text style={styles.txt}>Выйти</Text>
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
    alignItems: 'center',
  },
});
