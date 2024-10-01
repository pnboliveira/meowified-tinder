import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import fetchAPI from "@/utils/fetchAPI";
interface CatData {
  breeds: {
    name: string;
    description: string;
    adaptability: number;
  }[];
  id: string;
  url: string;
}

const Index = () => {
  const [catData, setCatData] = useState<CatData[] | undefined>(undefined);

  useEffect(() => {
    console.log("Fetching data...");
    fetchAPI("images/search?limit=10&has_breeds=1")
      .then((data) => setCatData(data))
      .catch((error) => console.error(error));
  }, []);

  if (catData === undefined) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {catData && catData[0].breeds.length > 0 ? (
            <Card
              key={catData[0].id}
              name={catData[0].breeds[0].name}
              bio={catData[0].breeds[0].description}
              image={catData[0].url}
              adaptability={catData[0].breeds[0].adaptability}
            />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Index;
