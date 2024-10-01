import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import HeartIcon from "@/assets/icons/HeartIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

const rotationValue = 60;

interface AnimationProps {
  data: any;
  renderItem: any;
  onReset: any;
  onVote?: any;
}

const AnimationContainer = ({
  data,
  renderItem,
  onReset,
  onVote,
}: AnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const { width: screenWidth } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);

  const tempTranslateX = 2 * screenWidth;
  const rotation = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, tempTranslateX], [0, rotationValue]) +
      "deg"
  );
  const startValue = 0;

  // reset and re-render cards once limit is reached
  if (currentIndex === data.length) {
    runOnJS(setCurrentIndex)(0);
    runOnJS(setNextIndex)(1);
    runOnJS(onReset)();
  }

  const cardValue = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotation.value,
      },
    ],
  }));
  const nextCardValue = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-tempTranslateX, 0, tempTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-tempTranslateX, 0, tempTranslateX],
      [1, 0.5, 1]
    ),
  }));

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, tempTranslateX], [0, 2]),
  }));
  const dislikeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -tempTranslateX], [0, 2]),
  }));

  const pan = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translateX.value;
    })
    .onChange((event) => {
      translateX.value = withSpring(
        prevTranslationX.value + event.translationX
      );
    })
    .onEnd((e) => {
      if (Math.abs(e.velocityX) < 800) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        tempTranslateX * Math.sign(e.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
      );

      e.velocityX > 0
        ? runOnJS(onVote)(currentIndex, 1)
        : runOnJS(onVote)(currentIndex, -1);
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
    });

  const handleVoting = (index: number, vote: number) => {
    onVote(index, vote);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <View style={styles.root}>
      <View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedStyle, nextCardValue]}>
          {renderItem({ item: nextIndex })}
        </Animated.View>
      </View>

      <GestureHandlerRootView style={styles.cardContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.animatedStyle, cardValue]}>
            <Animated.View style={[styles.like, { left: 60 }, likeOpacity]}>
              <HeartIcon />
            </Animated.View>
            <Animated.View
              style={[styles.like, { left: "80%" }, dislikeOpacity]}
            >
              <DeleteIcon />
            </Animated.View>
            {/* generate cards based on data */}
            {renderItem({ item: currentIndex })}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonVote}
          onPress={() => handleVoting(currentIndex, -1)}
        >
          <Text>
            <DeleteIcon />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonVote}
          onPress={() => handleVoting(currentIndex, 1)}
        >
          <Text>
            <HeartIcon />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  cardContainer: { width: "100%", flex: 1 },
  animatedStyle: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 0,
    gap: 48,
    bottom: 40,

    position: "absolute",
  },

  like: {
    position: "absolute",
    top: 200,
    zIndex: 1,
    width: 300,
    height: 300,
  },
  buttonVote: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 5,
  },
});

export default AnimationContainer;
