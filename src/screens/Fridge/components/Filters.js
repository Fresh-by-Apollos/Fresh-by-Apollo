// @flow
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import IconSelectArrowDownBlue from "./IconSelectArrowDownBlue";
import IconSelectArrowDownWhite from "./IconSelectArrowDownWhite";
import ListItemButton from "./ListItemButton";
import StickyItemButton from "./StickyItemButton";

const FILTERS_ICON_WIDTH = 44;
const FILTERS_BUTTON_WIDTH = 100;
const SCREEN_WIDTH = Dimensions.get("screen").width;

export default class Filters extends Component {
  animatedWidth = new Animated.Value(FILTERS_BUTTON_WIDTH);

  scrollViewRef = React.createRef();

  //   handleClick = () => {};

  onFiltersScroll = (event) => {
    const eventX = event.nativeEvent.contentOffset.x;

    const direction = eventX > 0 ? 1 : -1;
    const offsetX = Math.min(
      Math.abs(eventX),
      FILTERS_BUTTON_WIDTH - FILTERS_ICON_WIDTH
    );
    this.animatedWidth.setValue(FILTERS_BUTTON_WIDTH - offsetX * direction);
  };

  onScrollEndSnapToEdge = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const maxOffset = FILTERS_BUTTON_WIDTH - FILTERS_ICON_WIDTH;
    const velocityFactor = Math.abs(event.nativeEvent.velocity.x * 30);

    if (offsetX > 0 && offsetX < maxOffset / 2 - velocityFactor) {
      this.scrollViewRef.scrollTo({ x: 0 });
    }
  };

  render() {
    const { filters, activeFiltersCount, activeFiltersMap } = this.props;
    const scrollViewPaddingLeft = FILTERS_BUTTON_WIDTH - 18;

    return (
      <View style={styles.container}>
        {console.log(activeFiltersMap, "--------------------")}
        <View style={styles.stickyItem}>
          <Animated.View
            style={[
              styles.stickyItemMask,
              {
                width: this.animatedWidth,
                maxWidth: FILTERS_BUTTON_WIDTH,
              },
            ]}
          >
            <StickyItemButton activeFiltersCount={activeFiltersCount} />
          </Animated.View>
        </View>
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingLeft: scrollViewPaddingLeft },
          ]}
          showsHorizontalScrollIndicator={false}
          onScroll={this.onFiltersScroll}
          onScrollEndDrag={this.onScrollEndSnapToEdge}
          scrollEventThrottle={16}
          ref={this.scrollViewRef}
        >
          {filters.map((filter) => (
            <ListItemButton
              key={filter.name}
              onPress={filter.onPress}
              active={activeFiltersMap === filter.name}
              text={filter.label}
              icon={
                filter.type === "MULTI_CHOICE" && (
                  <DropDownIcon active={!!activeFiltersMap[filter.name]} />
                )
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const DropDownIcon = ({ active }) =>
  active ? (
    <IconSelectArrowDownBlue style={styles.dropDownIcon} />
  ) : (
    <IconSelectArrowDownWhite style={styles.dropDownIcon} />
  );

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    paddingLeft: 10,
    backgroundColor: "white",
  },
  stickyItem: {
    position: "absolute",
    zIndex: 1,
    left: 10,
    paddingRight: 8,
    backgroundColor: "white",
  },
  stickyItemMask: {
    minWidth: FILTERS_ICON_WIDTH,
    marginLeft: -8,
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollView: {
    marginLeft: 10,
  },
  scrollViewContent: {
    paddingLeft: 100,
    paddingRight: 10,
    paddingBottom: 13,
  },
  dropDownIcon: {
    marginRight: 6,
  },
});
