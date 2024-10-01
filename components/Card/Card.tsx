import React from "react";
import { Text, ImageBackground, StyleSheet, View } from "react-native";

// create Card props with their types
interface CardProps {
  name?: string;
  bio?: string;
  image: string;
  adaptability?: number;
}

const Card = ({ name, bio, image, adaptability }: CardProps) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{
          uri: image,
        }}
        style={styles.image}
      >
        <View style={styles.cardInner}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.adaptability}>Adaptability: {adaptability}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: "70%",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  cardInner: {
    alignSelf: "center",
    justifyContent: "space-evenly",
    width: 350,
    height: 60,
    top: 8,
    paddingTop: 8,
    paddingLeft: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    gap: 2,
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
  },
  bio: {
    lineHeight: 10,
    fontSize: 8,
  },
});

export default Card;
