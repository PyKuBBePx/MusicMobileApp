import React from "react";
import {View, Text, Pressable, Image} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {Header} from "../../components/Header/Header";

export const AboutScreen = () => {
  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Header titleScreen={'О приложении'} navigation={navigation} />
      <View
        style={{
          paddingHorizontal: 31,
          paddingTop: 30,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >

          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              color: '#fff',
              textAlign: 'justify'
            }}
          >
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
                color: '#fff'
              }}
            >MUSIC</Text> - музыкальный сервис. В нём собрано множество хитов, подкастов и аудиокниг.
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
            color: '#fff',
            textAlign: 'justify'
          }}
        >
          Помимо этого, MUSIC - это:
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
            color: '#fff',
            textAlign: 'justify'
          }}
        >
          {
            `
* возможность прослушивание музыки онлайн и офлайн
* подборки на основе ваших предпочтений
* поиск по ключевым словам
* высокое качество звука
            `
          }
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
            color: '#fff',
            textAlign: 'justify'
          }}
        >
          Новый сервис "Music" - ваш идеальный путеводитель в мире музыки! С Music вы можете наслаждаться миллионами треков из различных жанров, искать по ключевым словам, а также делиться любимыми композициями с друзьями и открывать новых исполнителей через персонализированные рекомендации. Наш умный алгоритм адаптирует предложения исходя из ваших музыкальных предпочтений, позволяя вам каждый день открывать что-то новое и уникальное. Поддерживайте свою музыкальную страсть вместе с Music!
        </Text>
      </View>
    </LinearGradient>
  )
}
