import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DatePicker from "react-native-neat-date-picker";

export default Calender = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState();

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    // You should close the modal in here
    setShowDatePicker(false);

    // The parameter 'date' is a Date object so that you can use any Date prototype method.

    setDateObj(JSON.stringify(date));
  };

  return (
    <View>
      <Button title={"open"} onPress={openDatePicker} />
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <View>
        <Text>{dateObj}</Text>
      </View>
    </View>
  );
};

// Notes:
/* Add buttons that allows users to enter preset dates. Ex. 2-Weeks from Now : 1-Day from now */
