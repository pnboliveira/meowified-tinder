import { View, StyleSheet, useWindowDimensions } from "react-native";
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

const rotationValue = 60;

interface AnimationProps {
  renderItem: any;
}

const AnimationContainer = ({ renderItem }: AnimationProps) => {
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
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
    });

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
            {/* generate cards based on data */}
            {renderItem({ item: currentIndex })}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
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
});

export default AnimationContainer;
