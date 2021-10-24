import React from "react";
import styles from "../barcodeLookUpStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Pressable, View, SafeAreaView } from "react-native";

export default DietWarningsModal = ({
  setScanned,
  setModalVisible,
  setFlagModalVisible,
  dietRestrictWarnings,
}) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <SafeAreaView
          style={{
            backgroundColor: "#D54C4C",
            ...styles.modalHeader,
          }}
        >
          <Pressable
            style={styles.modalCancel}
            onPress={() => {
              {
                setFlagModalVisible(false);
                setScanned(false);
              }
            }}
          >
            <MaterialIcons name="cancel" size={25} color="white" />
          </Pressable>
          <Text style={styles.modalHeaderText}>WARNING</Text>
          <SafeAreaView></SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={{ width: "90%" }}>
          {dietRestrictWarnings.dietFlags.length > 0 &&
          dietRestrictWarnings.dietLabels.length > 0 ? (
            <>
              <BothDietWarnings dietRestrictWarnings={dietRestrictWarnings} />
            </>
          ) : (
            <>
              {dietRestrictWarnings.dietLabels.length > 0 && (
                <DietRestrictionWarning
                  dietRestrictWarnings={dietRestrictWarnings}
                />
              )}
              {dietRestrictWarnings.dietFlags.length > 0 && (
                <DietFlagsWarning dietRestrictWarnings={dietRestrictWarnings} />
              )}
            </>
          )}
        </SafeAreaView>

        <SafeAreaView style={styles.throwOutBtnContainer}>
          <Pressable
            style={[styles.button, styles.buttonClose1]}
            onPress={() => {
              {
                setFlagModalVisible(false);
                setModalVisible(false);
                setScanned(false);
              }
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setFlagModalVisible(false)}
          >
            <Text style={styles.textStyle}>Continue</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </View>
  );
};

// Helpers

const DietRestrictionWarning = ({ dietRestrictWarnings }) => {
  return (
    <SafeAreaView>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 20,
          color: "darkred",
          textDecorationLine: "underline",
        }}
      >
        This Item conflicts with your Diet Needs
      </Text>
      <Text style={{ fontSize: 17, fontStyle: "italic" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
          }}
        >
          This item is not:
        </Text>
        {"  "}
        {dietRestrictWarnings.dietLabels.join(" | ")}
      </Text>
    </SafeAreaView>
  );
};

const DietFlagsWarning = ({ dietRestrictWarnings }) => {
  return (
    <SafeAreaView>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 18,
          color: "darkred",
          textDecorationLine: "underline",
        }}
      >
        This Item conflicts with your Diet Allergies
      </Text>
      <Text style={{ fontSize: 17, fontStyle: "italic" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
          }}
        >
          This item contains:
        </Text>
        {"  "}
        {dietRestrictWarnings.dietFlags.join(" | ")}
      </Text>
    </SafeAreaView>
  );
};

const BothDietWarnings = ({ dietRestrictWarnings }) => {
  return (
    <SafeAreaView>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 30,
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: 18,
          color: "darkred",
          textDecorationLine: "underline",
        }}
      >
        This Item conflicts with your Diet
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontStyle: "italic",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
          }}
        >
          This item contains:
        </Text>
        {"  "}
        {dietRestrictWarnings.dietFlags.join(" | ")}
      </Text>
      <Text style={{ fontSize: 17, fontStyle: "italic" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
          }}
        >
          This item is not:
        </Text>
        {"  "}
        {dietRestrictWarnings.dietLabels.join(" | ")}
      </Text>
    </SafeAreaView>
  );
};
