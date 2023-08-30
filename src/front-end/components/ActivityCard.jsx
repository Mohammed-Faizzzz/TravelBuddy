import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from "react-native-vector-icons/FontAwesome";
import Icons2 from "react-native-vector-icons/Foundation";

const ActivityCard = ({activity}) => {
  return (
    <View style={styles.container}>

      <Text style={{fontSize:20, fontWeight:"bold", marginBottom: 10}}>{activity.item.nameOfActivity}</Text>

      <View style={styles.miscContainer}>
        <View style={{backgroundColor: "#24627d",borderRadius: 7, padding: 7}}>
          <Text style={{color: "#f0f0f0"}}>{activity.item.time}</Text>
        </View>

        <View style={{flexDirection: "row", columnGap: 4, alignItems: "center"}}>
          <View style={{flexDirection: "row", columnGap: 4, alignItems: "center", backgroundColor: "#f0f0f0",borderRadius: 7, padding: 7}}>
            <Icons name="dollar" size={15} color="#900" />
            <Text>{activity.item.costOfActivity}</Text>
          </View>

          <View style={{flexDirection: "row", columnGap: 4, alignItems: "center", backgroundColor: "#f0f0f0",borderRadius: 7, padding: 7}}>
            <Icons2 name="foot" size={15} color="#900" />
            <Text>{activity.item.distanceFromAddress}</Text>
          </View>

        </View>


      </View>

      <Text style={{marginBottom: 7, fontStyle: "italic"}}>{activity.item.locationOfActivity}</Text>

      <Text>{activity.item.descriptionOfActivity}</Text>
      
    </View>
  )
}

export default ActivityCard

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  }, 
})