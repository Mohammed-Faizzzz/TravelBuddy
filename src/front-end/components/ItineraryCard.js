import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ActivityCard from './ActivityCard';

const ItineraryCard = ({itineraryData}) => {

    const dayData = itineraryData.item;

  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1, width: "100%", alignItems: "center", marginBottom: 7}}>
        <Text style={{fontWeight: "bold", fontSize:24, padding: 7, marginBottom: 5}}>Day {dayData.day}</Text>
      </View>
      
      <FlatList 
        data={dayData.activities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(activity) => (
            <ActivityCard activity={activity} />
        )}
      />
    </View>
  )
}

export default ItineraryCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 30,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#cce0ff',
        borderRadius: "30%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})