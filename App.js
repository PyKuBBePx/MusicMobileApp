import {AppNavigation} from "./scr/navigation";
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Medium': require('./scr/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./scr/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('./scr/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-SemiBold': require('./scr/assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./scr/assets/fonts/Montserrat-Bold.ttf'),
  });

  return (
    <AppNavigation />
  );
}
