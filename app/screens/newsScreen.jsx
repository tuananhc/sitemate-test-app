import { useNavigation } from "@react-navigation/native";
import { Button, Image, Linking, ScrollView, Text, View } from "react-native";

export default function NewsScreen({ route }) {
	const navigation = useNavigation();
	const params = route.params;
	console.log(params)
	return (
		<ScrollView style={{ flex: 1, padding: 10 }}>
			<Text style={{ fontSize: 20 }}>{params.source.name}</Text>
			<Text style={{ fontWeight: "bold", fontSize: 30 }}>{params.title}</Text>
			<Text>{params.author}</Text>
			<Text>{params.description}</Text>
			<Image 
				style={{
					height: 500,
					width: null,
					marginTop: 20,
					marginBottom: 20
				}} 
				source={{ uri: `${params.urlToImage}` }}
			/>
			<Text>{params.content}</Text>
			<View style={{ margin: 40 }}>
				<Button
					title="View full story"
					onPress={() => Linking.openURL(params.url)}
				/>
			</View>
		</ScrollView>
	)
}