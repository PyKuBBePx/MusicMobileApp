import {Image, View} from "react-native";

export const SplashScreen = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Image
        style={{flex: 1, height: undefined, width: undefined}}
        source={require('../../assets/SplashScreen.png')}
      />
    </View>
  )
}
