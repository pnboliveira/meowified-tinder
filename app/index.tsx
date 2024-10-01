import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import fetchAPI from "@/utils/fetchAPI";
import AnimationContainer from "@/components/AnimatedContainer/AnimatedContainer";
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
      <AnimationContainer
        renderItem={({ item }: { item: number }) =>
          catData[item] && catData[item].breeds.length > 0 ? (
            <Card
              key={catData[item].id}
              name={catData[item].breeds[0].name}
              bio={catData[item].breeds[0].description}
              image={catData[item].url}
              adaptability={catData[item].breeds[0].adaptability}
            />
          ) : undefined
        }
      />
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
