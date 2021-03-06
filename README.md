## Fresh By Apollos


## Video Overview:
https://youtu.be/mI6g0BOzG1Y

## Description

Fresh is a fridge & pantry management tool that tracks food expiration dates, allergens, diet restrictions, macronutrients, and more. Users can add items to their fridge through barcodes scans and search, track important data about their food, and will receive notifications from the app when their food is about to expire. Through Fresh's sleek and intuitive design, users can eliminate many of the common concerns associated with grocery shopping.

## Use Our App On Our Expo Go Account

1. Download <a href="https://expo.dev/client">Expo Go</a> on your mobile device or tablet

2. Log into the Fresh By Apollos account
   <br /> <strong > username: </strong> freshbyapollos
   <br /> <strong > password: </strong> freshbyapollosapp
3. Go to this url and scan the QR code https://expo.dev/@fresh-by-apollos/fresh-by-apollos
   <br /> OR <br />
   Tap on Profile, open up Recent Projects, and tap Fresh By Apollos

## Download Repository

```
cd <DIRECTORY_YOU_WANT_TO_DOWNLOAD_TO>

git clone https://github.com/Fresh-by-Apollos/Fresh-by-Apollo.git

(May need to nvm install 14.17.6 before npm install)

npm install

npm start
```

## Team

Apollos Severe: <br/>
https://www.linkedin.com/in/apollos-severe/ <br />
https://github.com/ApollosSevere

Francis Yu: <br />
https://www.linkedin.com/in/francisjyu/ <br />
https://github.com/frankmakesthecode

Eric Nguyen: <br />
https://www.linkedin.com/in/ericdaonguyen/ <br />
https://github.com/EricDaoNguyen

Franklin Yin: <br />
https://www.linkedin.com/in/franklin-yin/ <br />
https://github.com/franklinyin1

## Current Features

- New Users are onboarded by inputting their diet restrictions and allergies
- Users can add items to the fridge through barcode scan, adding number of servings, storage type (pantry, fridge, freezer), and expiration date
- Users can add items to the fridge through manual input, adding number of servings, storage type (pantry, fridge, freezer), and expiration date
- The fridge view will display:
  - Number of servings available in the fridge
  - The number of days till the item expires
  - The item's storage type
- When users click on an item it displays:
  - The number of servings
  - The item's expiration date
  - The item's diet restrictions & allergens
  - The item's macronutrients (based on total servings available)
- The user has the ability to remove an item and record it as consumed or thrown out
- The user has access to the fridge statistics page that shows:
  - Total macronutrients of items in their fridge
  - Report of items consumed vs thrown out
- On a daily basis (at 3pm EST), Fresh notifies users of any items that are about to expire

## Tech Stack

- React-Native
  - Used as a framework for a mobile app that can be run on Android and iOS
- Firebase Firestore
  - Store user and food information
- Victory Native
  - Visual data representations of macronutrients and food consumption statistics
- In-house global state management system
  - Using React's useContext, we created our own global state to manage state within the app
- Chomp API & Barcode Spider API
  - Used to get information of items added via barcode scan
- Spoonacular API
  - Used to get information of items added via manual input
- Docker & Google Cloud
  - Used to create and upload an image for sending scheduled push notifications
- Expo
  - To quick start the app, text in real time, receive push notifications

## Stretch Goals

- Add the ability for multiple users to share a single fridge
  - Allow users to assign items that "belong" to them
- Implement Google OCR API to allow users to scan their receipts as a way to add items to their fridge
- Allow users to customize their notification settings
- Add a feed and friends list so that users can browse and interact with items their friends are buying
