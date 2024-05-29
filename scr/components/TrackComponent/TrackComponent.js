import React, {useState} from "react";
import {Image, Pressable, View, Text} from "react-native";

export const TrackComponent = ({ data, navigation, setModal = null }) => {

  return(
    <Pressable
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 30,
      }}
      onPress={() => {
        console.log('click')
        if (setModal) setModal(false)
        navigation.navigate('TrackScreen', {key: data.id, data})
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 13,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 7,
            justifyContent: 'center'
          }}
        >
          {
            data.image
              ? <Image
                  style={{flex: 1, height: undefined, width: undefined}}
                  resizeMode="contain"
                  source={{uri: data.image}}
                />
              : <Image
                  style={{flex: 1, height: undefined, width: undefined}}
                  resizeMode="contain"
                  source={require('../../assets/image-placeholder-100.png')}
                />
          }
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
              color: '#fff'
            }}
          >{data.name}</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Light',
              color: '#fff'
            }}
          >{data.author}</Text>
        </View>
      </View>
      <View>
        <Image source={require('../../assets/ArrowWhite.png')} />
      </View>
    </Pressable>
  )
}
