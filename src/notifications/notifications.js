import cron from "node-cron";

import { Expo } from "expo-server-sdk";
import * as admin from "firebase-admin";
import { differenceInCalendarDays } from "date-fns";

let expo = new Expo();

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb = admin.firestore();
console.log("firestoreDb:", firestoreDb);

firestoreDb.settings({ timestampsInSnapshots: true });


cron.schedule("53 18 * * *", async function loadPushNotifications() {

  const usersRef = firestoreDb.collection("users");

  const usersSnapshot = await usersRef.get();

  usersSnapshot.forEach(async (user) => {
    let token = user.data().expoPushToken;
    if (token) {
      let userId = user.id;
      let fridgeRef = firestoreDb
        .collection(`/users/${userId}/currentFridge`)
        .orderBy("expirationDate", "asc");
      let fridgeSnapshot = await fridgeRef.get();
      let currDate = new Date();
      fridgeSnapshot.forEach(async (fridgeItem) => {
        let expirationDate = new Date(
          fridgeItem.data().expirationDate.seconds * 1000
        );
        let timeDifference = differenceInCalendarDays(expirationDate, currDate);
        if (timeDifference === 1 || timeDifference === 3) {
          console.log("entered valid time difference");
          let message = [{
            to: token,
            sound: "default",
            body: `${user.data().firstName} ${
              user.data().lastName
            }: Your item, ${
              fridgeItem.data().name
            }, is set to expire in ${timeDifference} day(s)`,
            data: { withSome: "data" },
          }];
          try {
            let ticketMessage = await expo.sendPushNotificationsAsync(message);
            console.log(ticketMessage);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  });
});
