import React from 'react'
import {Image, Modal, Platform, Pressable, SafeAreaView, StatusBar, Text, TextInput, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useState} from "react";
import auth from '@react-native-firebase/auth';
import {CustomModal} from "../../components/Modal/Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addUser} from "../../fetch/authFetch";

export const AuthRegScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [typeScreen, setTypeScreen] = useState(route?.params?.type)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')
  const [modalEvent, setModalEvent] = useState()

  React.useEffect(() => {
    setTypeScreen(route?.params?.type)
  }, [route?.params?.type])

  const navigateToMain = () => {
    setEmail('');
    setPassword('');
    setLogin('')
    navigation.navigate('MainStack')
  }

  const authorizationUser = () => {
    if (email.trim() === '' || password.trim() === '') {
      clearState()
      const titleError = 'Error!'
      let textError = 'Проверьте правильность введенных данных. \nВсе поля должны быть заполненны!'

      setModalTitle(titleError)
      setModalText(textError)
      setModalVisible(true)
      return true
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log('User authenticated!');
        const uid = res.user.uid

        await AsyncStorage.setItem('uid', uid, async () => {
          navigateToMain();
        })
      })
      .catch(error => {
        const titleError = 'Error!'
        let textError = error

        clearState()

        setModalTitle(titleError)
        setModalText(textError)
        setModalVisible(true)

        console.error(error);
      });
  }

  const clearState = () => {
    setEmail('')
    setPassword('')
    setLogin('')
  }

  const registrationUser = () => {
    if (email.trim() === '' || password.trim() === '' || login.trim() === '') {
      clearState()
      const titleError = 'Error!'
      let textError = 'Проверьте правильность введенных данных. \nВсе поля должны быть заполненны!'

      setModalTitle(titleError)
      setModalText(textError)
      setModalVisible(true)
      return true
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log('User account created & signed in!');
        const titleError = 'Поздравляю!'
        let textError = 'Вы успешно зарегистрировались!'

        const uid = res.user.uid
        addUser(email, login, uid)
        await AsyncStorage.setItem('uid', uid, async () => {
          setModalTitle(titleError)
          setModalText(textError)
          setModalEvent(navigateToMain)
          setModalVisible(true)
        })
      })
      .catch(error => {
        const titleError = 'Error!'
        let textError = ''

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          textError = 'Этот email уже используется!';
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          textError = 'Этот email не корректен!';
        }

        clearState()

        setModalTitle(titleError)
        setModalText(textError)
        setModalVisible(true)

        console.error(error);
      });
  }

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
      style={{ width: '100%', height: '100%'}}
    >
      <CustomModal
        modalVisible={modalVisible}
        modalTitle={modalTitle}
        modalText={modalText}
        pressEvent={modalEvent}
        setModalVisible={setModalVisible}
      />
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: 76,
            height: 95.5,
            marginTop: 18
          }}
        >
          <Image source={require('../../assets/logo.png')} />
        </View>
        <View
          style={{
            width: '85%',
            gap: 20,
            paddingTop: 50
          }}
        >
          <TextInput
            value={email}
            onChangeText={(el) => setEmail(el)}
            placeholder="Почта"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={{
              paddingVertical: 13,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 10,
              paddingLeft: 18,
              color: '#fff',
            }}
          />
          <TextInput
            value={password}
            onChangeText={(el) => setPassword(el)}
            secureTextEntry
            placeholder="Пароль"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={{
              fontFamily: 'Montserrat-Regular',
              paddingVertical: 13,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 10,
              paddingLeft: 18,
              color: '#fff',
            }}
          />
          {
            typeScreen !== 'auth' && (
              <TextInput
                value={login}
                onChangeText={(el) => setLogin(el)}
                placeholder="Логин"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  paddingVertical: 13,
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 10,
                  paddingLeft: 18,
                  color: '#fff',
                }}
              />
            )
          }
        </View>
        <Pressable
          style={{
            width: '85%',
            marginTop: 67,
            alignItems: 'center',
            backgroundColor: '#773A95',
            borderRadius: 10
          }}
          onPress={() => {
            if (typeScreen === 'auth') {
              authorizationUser();
            } else {
              registrationUser();
            }
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 16,
              color: '#fff',
              marginVertical: 17
            }}
          >
            {typeScreen === 'auth' ? "Войти" : "Зарегистрироваться" }
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 24
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#fff',
              fontSize: 16
            }}
          >
            {
              typeScreen === 'auth'
                ? 'У вас еще нет аккаунта?'
                : 'У вас уже есть аккаунт?'
            }
          </Text>
          <Pressable
            onPress={() => {
              clearState()
              setTypeScreen(typeScreen === 'auth' ? 'reg' : 'auth')
            }}
          >
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
                fontSize: 16
              }}
            >
              {
                typeScreen === 'auth'
                  ? 'Зарегистрируйтесь'
                  : 'Авторизуйтесь'
              }
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
