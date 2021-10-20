import cron from "node-cron";

import { Expo } from "expo-server-sdk";
// import * as SecureStore from "expo-secure-store";
// import firebase from "../firebase/firebase";
import * as admin from "firebase-admin";
// import { initializeApp } from "firebase-admin/app";
// import { Storage } from "@google-cloud/storage";
// import firebase from "../firebase/firebase";
import { differenceInCalendarDays } from "date-fns";

// let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
let expo = new Expo();

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb = admin.firestore();
console.log("firestoreDb:", firestoreDb);

firestoreDb.settings({ timestampsInSnapshots: true });

// const userId = "SifrqRnjtrMQQn3CWUXV9a4KMoS2";

cron.schedule("*/1 * * * *", async function loadPushNotifications() {
  // Create the messages that you want to send to clients
  console.log("entered cron function");
  let messages = [];

  const usersRef = firestoreDb.collection("users");
  console.log("usersRef:", usersRef);

  const usersSnapshot = await usersRef.get()
  console.log("usersSnapshot:", usersSnapshot)

  usersSnapshot.forEach(async (user) => {
    let token = user.data().expoPushToken
    if (token) {
      let userId = user.id
      let fridgeRef = firestoreDb.collection(`/users/${userId}/currentFridge`).orderBy("expirationDate", "asc")
      let fridgeSnapshot = await fridgeRef.get()
      let currDate = new Date()
      fridgeSnapshot.forEach((fridgeItem) => {
        let expirationDate = new Date(fridgeItem.data().expirationDate.seconds * 1000)
        let timeDifference = differenceInCalendarDays(expirationDate, currDate)
        if (timeDifference === 1 || timeDifference === 3){
          console.log('entered valid time difference')
          let obj = {
            to: token,
            sound: "default",
            body: `${user.data().firstName} ${user.data().lastName}: Your item, ${fridgeItem.data().name}, is set to expire in ${timeDifference} days`,
            data: {withSome: "data"}
          }
          messages.push(obj)
          console.log('messages in time diff check:', messages)
        }
      })
    }
  })

  console.log('messages outside of time diff check:', messages)

  // usersRef.onSnapshot((usersSnapshot2) => {
  //   console.log('usersSnapshot in onSnapshot:', usersSnapshot2)
  //   usersSnapshot2.forEach((user) => console.log('user.data() in usersRef.onSnapshot:', user.data()))
  // })
})

// const usersSnapshot = await usersRef.get();
// console.log('usersSnapshot:', usersSnapshot)
// usersSnapshot.forEach(async (user) => {
//   let token = user.data().expoPushToken;
//   if (token) {
//     console.log('entered token')
//     let userId = user.id;
//     console.log('userId:', userId)
//     let fridgeRef = firestoreDb
//       .collection(`/users/${userId}/curentFridge`)
//       .orderBy("expirationDate", "asc");
//     const fridgeSnapshot = await fridgeRef.get();
//     let currDate = new Date();
//     for (let i = 0; i < fridgeSnapshot.length; i++) {
//       let fridgeItem = fridgeSnapshot[i];
//       console.log('fridgeItem:', fridgeItem)
//       let expirationDate = new Date(
//         fridgeItem.data().expirationDate.seconds * 1000
//       );
//       let timeDifference = differenceInCalendarDays(expirationDate, currDate);
//       console.log('timeDifference:', timeDifference)
//       if (timeDifference > 3) {
//         break;
//       } else if (timeDifference === 1 || timeDifference === 3) {
//         messages.push({
//           to: token,
//           sound: "default",
//           body: `${user.data().firstName} ${user.data().lastName}: Your item, ${
//             fridgeItem.data().name
//           }, is set to expire in ${timeDifference} days`,
//           // data: { withSome: "data" },
//         });
//       }
//     }
//   }
// });

//   let chunks = expo.chunkPushNotifications(messages);
//   let tickets = [];
//   (async () => {
//     // Send the chunks to the Expo push notification service. There are
//     // different strategies you could use. A simple one is to send one chunk at a
//     // time, which nicely spreads the load out over time:
//     for (let chunk of chunks) {
//       try {
//         let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//         console.log(ticketChunk);
//         tickets.push(...ticketChunk);
//         // NOTE: If a ticket contains an error code in ticket.details.error, you
//         // must handle it appropriately. The error codes are listed in the Expo
//         // documentation:
//         // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   })();
// });

// console.log("userRef:", userRef);
// userRef.doc(userId).onSnapshot(async function (doc) {
//   console.log("doc.data():", doc.data());
//   let token = doc.data().expoPushToken;
//   console.log("token:", token);

//   let somePushTokens = [token];
//   for (let pushToken of somePushTokens) {
// Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

// Check that all your push tokens appear to be valid Expo push tokens
// if (!Expo.isExpoPushToken(pushToken)) {
//   console.error(
//     `Push token ${pushToken} is not a valid Expo push token`
//   );
//   continue;
// }
// let date = new Date();
// date = JSON.stringify(date);

// Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
// messages.push({
//   to: pushToken,
//   sound: "default",
//   body: `The date is ${date}`,
// data: { withSome: "data" },
// });
// }

// The Expo push notification service accepts batches of notifications so
// that you don't need to send 1000 requests to send 1000 notifications. We
// recommend you batch your notifications to reduce the number of requests
// and to compress them (notifications with similar content will get
// compressed).
// let chunks = expo.chunkPushNotifications(messages);
// let tickets = [];
// (async () => {
// Send the chunks to the Expo push notification service. There are
// different strategies you could use. A simple one is to send one chunk at a
// time, which nicely spreads the load out over time:
// for (let chunk of chunks) {
//   try {
//     let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//     console.log(ticketChunk);
//     tickets.push(...ticketChunk);
// NOTE: If a ticket contains an error code in ticket.details.error, you
// must handle it appropriately. The error codes are listed in the Expo
// documentation:
// https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   })();
// });

/*
  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage();
  // Makes an authenticated API request.
  async function listBuckets() {
    try {
      const results = await storage.getBuckets();

      const [buckets] = results;

      console.log("Buckets:");
      buckets.forEach((bucket) => {
        console.log(bucket.name);
      });
    } catch (err) {
      console.error("ERROR:", err);
    }
  }
  listBuckets();
  */
/*
  // const userId = '1JFGaOjb95SefH2zlOJKz3ap17U2'
  // const userRef = firebase.firestore().collection('users')
  // let token
  // await userRef.doc(userId).onSnapshot(async function(doc) { token = await doc.data().expoPushToken })

  // let token = await SecureStore.getItemAsync("expoPushToken");
  let somePushTokens = [token];

  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: "default",
      body: "This is a test notification",
      data: { withSome: "data" },
    });
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();
*/

// loadPushNotifications()
