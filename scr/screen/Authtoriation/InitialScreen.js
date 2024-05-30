import {Image, Pressable, View, Text, SafeAreaView, StatusBar, Platform} from "react-native";
import React from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SplashScreen} from "./SplashScreen";


export const InitScreen = () => {
  const navigation = useNavigation();
  const [splashScreen, setSplashScreen] = React.useState(true)

  React.useEffect(() => {
    const getInitScreen = async () => {
      const uid = await AsyncStorage.getItem('uid')
      const initScreen = await AsyncStorage.getItem('setInitScreen')

      if (uid) {
        navigation.navigate('MainStack')
      } else if (initScreen) {
        navigation.navigate('AuthRegScreen', {type: 'auth'})
      }

      setSplashScreen(false);
    }

    getInitScreen()
  }, [])

  const initApp = async () => {
    await AsyncStorage.setItem('setInitScreen', "true")
    navigation.navigate('AuthRegScreen', {type: "auth"})
  }

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
    >
      {
        splashScreen
          ? <SplashScreen />
          : (
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
                  marginTop: 174,
                  gap: 33,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Montserrat-Bold',
                    color: '#fff',
                  }}
                >Слушай музыку — будь в ритме!</Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                    color: '#fff',
                  }}
                >Музыка — это ты!</Text>
              </View>
              <Pressable
                style={{
                  width: '85%',
                  marginTop: 240,
                  alignItems: 'center',
                  backgroundColor: '#773A95',
                  borderRadius: 10
                }}
                onPress={() => initApp()}
              >
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 16,
                    color: '#fff',
                    marginVertical: 17
                  }}
                >Начать</Text>
              </Pressable>
            </SafeAreaView>
          )
      }
    </LinearGradient>
  )
}
