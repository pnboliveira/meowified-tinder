import { View, Text, StyleSheet } from "react-native";
import { useEffect, useCallback, useState } from "react";
import Card from "@/components/Card/Card";
import fetchAPI from "@/utils/fetchAPI";
import { voteAPI } from "@/utils/voteAPI";
import AnimationContainer from "@/components/AnimatedContainer/AnimatedContainer";
interface CatData {
  breeds: {
    name: string;
    origin: string;
    adaptability: number;
  }[];
  id: string;
  url: string;
}

const Index = () => {
  const [catData, setCatData] = useState<CatData[] | undefined>(undefined);
  const [vote, setVote] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    console.log("Fetching data...");
    fetchAPI("images/search?limit=10&has_breeds=1")
      .then((data) => setCatData(data))
      .catch((error) => console.error(error));
  }, []);

  const reFetch = () => {
    console.log("Fetching new data...");
    fetchAPI("images/search?limit=10&has_breeds=1")
      .then((data) => setCatData(data))
      .catch((error) => console.error(error));
  };

  useCallback(() => {
    if (catData != undefined) {
      voteAPI({ catId: catData[index].id, vote: 1 })
        .then(() => {
          console.log("Voted!");
        })
        .catch((error) => console.error(error));
    }
  }, [vote]);

  //catch all events in the app and print them to the console

  const newVote = (index: any, vote: number) => {
    setIndex(index);
    setVote(vote);
  };

  const resetState = () => {
    setCatData(undefined);
    console.log("Resetting state...");
    reFetch();
  };

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
        data={catData}
        onReset={resetState}
        onVote={newVote}
        renderItem={({ item }: { item: number }) =>
          catData[item] && catData[item].breeds.length > 0 ? (
            <Card
              key={catData[item].id}
              name={catData[item].breeds[0].name}
              bio={catData[item].breeds[0].origin}
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
    backgroundColor: "#FBFAFF",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Index;
