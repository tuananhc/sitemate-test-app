import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import NewsScreen from './screens/newsScreen';
import SearchResult from './screens/searchResult';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: { 
        headerShown: false 
      }
    },
    News: NewsScreen,
    SearchResult: SearchResult
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}