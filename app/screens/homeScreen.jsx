import { Image, View, Text, FlatList, TextInput, TouchableOpacity, Button, Modal } from 'react-native';

import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const NEWS_API = "183daca270264bad86fc5b72972fb82a";

export default function HomeScreen() {
  const [searchKey, setSearchKey] = useState("");
  const [hotTopics, setHotTopics] = useState([]);
	const [filterModalVisible, setFilterModalVisible] = useState(false)
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
        <Text style={{ 
					fontWeight: "bold", 
					fontSize: 15, 
					marginBottom: 5 
				}}>
					{item.title}
				</Text>
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
        justifyContent: "flex-end",
        alignItems: "center"
      }}>
        <Text style={{ 
          fontWeight: "bold",
          fontSize: 20,
					marginBottom: 70
        }}>
          Today is {currentDate.toLocaleDateString("en-GB")}
        </Text>
        <Text>What are you looking for?</Text>
        <View style={{
          flex: 0.35,
          width: "85%",
          borderWidth: 1,
          borderRadius: 30,
          marginTop: 10,
          margin: 20,
          alignItems: "center",
          paddingLeft: 15,
          flexDirection: "row",
					justifyContent: "space-between"
        }}>
					<View style={{alignItems: "center", flexDirection: "row"}}>
						<Ionicons size={20} color="gray" name="search"/>
						<TextInput 
							style={{ marginLeft: 10 }}
							value={searchKey}
							onChangeText={setSearchKey}
							placeholder="search here"
							onSubmitEditing={() => navigation.navigate("SearchResult", searchKey)}
						/>
					</View>
					<TouchableOpacity
						onPress={() => setFilterModalVisible(false)}
					>
						<Ionicons style={{ marginRight: 10 }} size={20} color="lightblue" name="arrow-down-circle"/>
					</TouchableOpacity>
        </View>
				<Modal 
					animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setFilterModalVisible(!filterModalVisible);
          }}
				>
					<View>
						<Text>Filter goes here</Text>
					</View>
				</Modal>
      </View>
      <View id="hot-topic" style={{
        flex: 0.7,
        alignItems: "center"
      }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 25,
          margin: 20,
					color: "red"
        }}
        >
          Top Trending News Today
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