import { Expo } from "expo-server-sdk";
import * as admin from "firebase-admin";
import { differenceInCalendarDays } from "date-fns";
import express from "express";
import { PORT } from '@env'
const app = express();

let expo = new Expo();

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb = admin.firestore();
console.log("firestoreDb:", firestoreDb);

firestoreDb.settings({ timestampsInSnapshots: true });

app.listen(Number(PORT), () => console.log(`Mixing it up on port ${PORT}`));

app.get("/", (req, res) => {
  loadPushNotifications()
  res.send('Push notifications processed');
});

async function loadPushNotifications() {
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
          let message = [
            {
              to: token,
              sound: "default",
              body: `${user.data().firstName} ${
                user.data().lastName
              }: Your item, ${
                fridgeItem.data().name
              }, is set to expire in ${timeDifference} day(s)`,
              data: { withSome: "data" },
            },
          ];
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
}
