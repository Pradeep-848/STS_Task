import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import AuthScreen from './src/screens/AuthScreen';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AuthScreen'>        
      <Stack.Screen name='AuthScreen' component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

