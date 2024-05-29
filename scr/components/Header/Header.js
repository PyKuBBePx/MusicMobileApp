import {Image, Pressable, Text, View} from "react-native";

export const Header = ({ titleScreen, navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 17,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 21
      }}
    >
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/ArrowWhite-left.png')} />
      </Pressable>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 16,
          color: '#FFF'
        }}
      >
        {titleScreen}
      </Text>
      <View></View>
    </View>
  )
}
