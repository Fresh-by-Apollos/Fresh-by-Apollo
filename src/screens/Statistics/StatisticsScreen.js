import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import { useStorage } from '../../store/Context'

function StatisticsScreen() {
  const { fridgeState } = useStorage()
  const [ totalMacros, setTotalMacros ] = useState({})

  const fetchTotal = async(items) => {
    let total = {
      protein: 0,
      carbs: 0,
      fat: 0
    }
    items.forEach((item) => {
      total.protein += item.protein
      total.carbs += item.carbs
      total.fat += item.fat
    })
    setTotalMacros(total)
  }

  useEffect(() => {
    fetchTotal(fridgeState)
  }, [])

  // const fetchTotalProtein = async() => {
  //   try {
  //     const userId = firebase.auth().currentUser.uid;
  //     const fridgeRef = firebase
  //       .firestore()
  //       .collection(`/users/${userId}/currentFridge`)
  //     const proteinSnapshot = await fridgeRef.where('protein', '>', 0).get()
  //     let total = 0
  //     proteinSnapshot.forEach((doc) => {
  //       total += doc.data().protein
  //     })
  //     return total
  //   } catch (error) {
  //     return `Error: ${error.message} || fetchTotalProtein`
  //   }
  // }

  return (
    <SafeAreaView>
      <Text>Current Fridge Stats</Text>
      <Text>Protein: {totalMacros.protein}</Text>
      <Text>Carbs: {totalMacros.carbs}</Text>
      <Text>Fat: {totalMacros.fat}</Text>
    </SafeAreaView>
  )
}

export default StatisticsScreen
