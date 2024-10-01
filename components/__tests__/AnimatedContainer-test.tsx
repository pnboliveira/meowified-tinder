import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AnimatedContainer from "@/components/AnimatedContainer/AnimatedContainer";
import { Text } from "react-native";
import HeartIcon from "@/assets/icons/HeartIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

describe("AnimatedContainer", () => {
  const mockData = [1, 2, 3];
  const mockRenderItem = jest.fn(({ item }) => <Text>{item}</Text>);
  const mockOnReset = jest.fn();
  const mockOnVote = jest.fn();

  it("renders correctly", () => {
    const { getByText } = render(
      <AnimatedContainer
        data={mockData}
        renderItem={mockRenderItem}
        onReset={mockOnReset}
        onVote={mockOnVote}
      />
    );

    expect(getByText("1")).toBeTruthy();
  });
});
