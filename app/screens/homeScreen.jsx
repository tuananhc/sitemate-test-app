import { Image, View, Text, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';

import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const NEWS_API = "183daca270264bad86fc5b72972fb82a";

export default function HomeScreen() {
  const [searchKey, setSearchKey] = useState("");
  const [hotTopics, setHotTopics] = useState([]);
  const navigation = useNavigation()

  let currentDate = new Date();
  
  useEffect(() => {
    getHotNews();
  }, []);

  async function getHotNews() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API}`,
      );
      const json = await response.json();
      if (json.status !== "ok") {
        // error handling
      }

      setHotTopics(json.articles);
    } catch (error) {
      console.error(error);
    }
  }

	// can be re-used for different screens
  function renderItem(item) {
    return (
      <TouchableOpacity 
        style={{ 
          margin: 10,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
        }}
        onPress={() => navigation.navigate("News", item)}
      >
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        { (item.author)
        ? <Text>{item.author}</Text> 
        : <></>
        }
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View id="search-box" style={{
        flex: 0.3, 
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <Text style={{ 
          fontWeight: "bold",
          fontSize: 20 
        }}>
          Today is {currentDate.toLocaleDateString()}
        </Text>
        <Text>What are you looking for?</Text>
        <View style={{
          flex: 0.2,
          width: "85%",
          borderWidth: 1,
          borderRadius: 30,
          marginTop: 10,
          margin: 20,
          alignItems: "center",
          paddingLeft: 15,
          flexDirection: "row"
        }}>
          <Ionicons size={20} color="gray" name="search"/>
          <TextInput 
            style={{ marginLeft: 10 }}
            value={searchKey}
            onChangeText={setSearchKey}
						placeholder="search here"
						onSubmitEditing={() => navigation.navigate("SearchResult", searchKey)}
          />
        </View>
      </View>
      <View id="hot-topic" style={{
        flex: 0.7,
        alignItems: "center"
      }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 25,
          margin: 20
        }}
        >
          Top Trending Today
        </Text>
        <View style={{ 
          flex: 1,
          padding: 10
        }}>
          <FlatList 
            data={hotTopics}
            renderItem={item => renderItem(item.item)}
          />
        </View>
      </View>
      
    </SafeAreaView>
  );
}