import React, {useState} from "react";
import {Image, Pressable, View, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {getUserInfo} from "../../fetch/userFetch";
import {getFavouriteUserTracks} from "../../fetch/favouriteFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {namingCountTrack} from "../../function/namingOfCount";
import Skeleton from "@hamidfzm/react-native-skeleton-loader/src";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [countFavourite, setCountFavourite] = React.useState(null)
  const [userInfoData, setUserInfoData] = React.useState([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    getUserInfo()
      .then(res => {
        setUserInfoData(res[0])
        console.log(res)
      });
    getFavouriteUserTracks()
      .then(res => setCountFavourite(res.length));
  }, [])

  React.useEffect(() => {
    setLoading(false)
  }, [countFavourite, userInfoData])

  const exitApp = async () => {
    await AsyncStorage.removeItem('uid')
    navigation.navigate('AuthRegScreen', {type: 'auth'})
  }

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 21,
        paddingTop: 15
      }}
    >
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 16
          }}
        >
          <Skeleton loading={loading} type={"circle"}>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35
              }}
            >
              <Image
                style={{flex: 1, height: undefined, width: undefined}}
                source={
                  userInfoData.image
                    ? {uri: userInfoData.image}
                    : require('../../assets/profile-icon.png')
                }
              />
            </View>
          </Skeleton>
          <View
            style={{
              gap: 15
            }}
          >
            <Skeleton loading={loading} width={100}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 18,
                  color: '#FFF'
                }}
              >{userInfoData.login}</Text>
            </Skeleton>
            <Skeleton loading={loading} width={100}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 18,
                  color: '#FFF'
                }}
              >{userInfoData.email}</Text>
            </Skeleton>
          </View>
        </View>
        <Pressable
          style={{
            justifyContent: 'center',
            width: 15,
            height: 15
          }}
          onPress={() => navigation.navigate('MainScreen')}
        >
          <Image
            style={{flex: 1, height: undefined, width: undefined}}
            source={require('../../assets/ArrowWhite.png')}
          />
        </Pressable>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 50,
          gap: 40
        }}
      >
        <Pressable
          style={{
            width: '100%',
            maxHeight: 'max-content',
            gap: 10
          }}
          onPress={() => navigation.navigate('FavoriteScreen')}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 18,
              color: '#FFF'
            }}
          >Избранное</Text>
          <Skeleton loading={loading} width={100}>
            <Text
              style={{
                fontFamily: 'Montserrat-Light',
                fontSize: 14,
                color: '#FFF'
              }}
            >{namingCountTrack(countFavourite)}</Text>
          </Skeleton>
        </Pressable>
        <Pressable
          style={{
            width: '100%',
            maxHeight: 'max-content',
          }}
          onPress={() => navigation.navigate('AboutScreen')}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 18,
              color: '#FFF'
            }}
          >О приложении</Text>
        </Pressable>
        <Pressable
          style={{
            width: '100%',
            maxHeight: 'max-content',
          }}
          onPress={() => exitApp()}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 18,
              color: '#FFF'
            }}
          >Выйти</Text>
        </Pressable>
      </View>
    </LinearGradient>
  )
}
