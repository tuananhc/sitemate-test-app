import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const NEWS_API = "183daca270264bad86fc5b72972fb82a";

export default function SearchResult({ route }) {
	const navigation = useNavigation();
	const [searchResult, setSearchResult] = useState([]);
	const params = route.params;

	async function getSearchResult(search) {
		try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${NEWS_API}&pageSize=50`,
      );
      const json = await response.json();
      if (json.status !== "ok") {
        // error handling
      }

      setSearchResult(json.articles);
    } catch (error) {
      console.error(error);
    }
	}

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

	useEffect(() => {
		getSearchResult(params);
	}, [])

	return (
		<View style={{flex: 1, padding: 10}}>
			<Text style={{ fontSize: 20, marginBottom: 10 }}>
				Search result for:
				<Text style={{ fontWeight: "bold" }}> {params}</Text>
			</Text>
			<FlatList 
				data={searchResult}
				renderItem={item => renderItem(item.item)}
			/>
		</View>
	)
}