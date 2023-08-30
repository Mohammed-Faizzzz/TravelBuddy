import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, TouchableWithoutFeedback, Button } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

import ItineraryCard from '../components/ItineraryCard';

const TravelInput = ({ navigation }) => {

  const [location, setLocation] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [destinationType, setDestinationType] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [disabilities, setDisabilities] = useState(''); 
  const [activities, setActivities] = useState('');
  const [showDestinationTypePicker, setShowDestinationTypePicker] = useState(false);
  const [showDietaryRequirementsPicker, setShowDietaryRequirementsPicker] = useState(false);
  const [showDisabilitiesPicker, setShowDisabilitiesPicker] = useState(false);
  const [result, setResult] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => {
    console.log(result); // Log the updated result whenever it changes
  }, [result]);

  const promptGen = (location, selectedStartDate, selectedEndDate, hotelAddress, destinationType, dietaryRequirements, disabilities, activities) => {
    return `The following is a travel itinerary request :

    A person travelling to ${location} from ${selectedStartDate} to ${selectedEndDate}.
    The place where the traveller/s are staying is at ${hotelAddress}. The trip is a ${destinationType}. The dietary requirements of the traveller/s is ${dietaryRequirements}, the traveller/s are ${disabilities}.
    
    Preferred activities are : ${activities}. (For this, if the activities do not make sense to you, in your reply JSON, just send back the following :
    {
        "itinerary" : {},
        "totalCost": "",
        "error" : 'error'
    }
    )
    
    Plan out a daily itinerary for the entire trip (all the days from start to end) as stated above based on the info above.I want you to return the data of itinerary for the whole trip you fetch as a JSON with the following headings :
    {
      "itinerary": [
        {
          "day": "1",
          "activities": [
            {
              "time": "",
              "nameOfActivity": "",
              "descriptionOfActivity": "", // add a short description about the activity 
              "locationOfActivity": "",
              "costOfActivity": "",
              "distanceFromAddress": "", // as numbers in km
              "disabilityFriendly": "",
              "isFood": "",
              "locationOfNearestFood": ""
            },{},{}
          ]
        },
        {
          "day": "2",
          "activities": [{},{},{}]
        },
        {
          "day": "3",
          "activities": [{},{},{}]
        } // keep going till the last day
      ],
      "totalCost": "", // must be a string
      "error": ""
    }
    `; 
  }

  const toggleDestinationTypePicker = () => {
    setShowDestinationTypePicker(prev => !prev);
  };

  const toggleDietaryRequirementsPicker = () => {
    setShowDietaryRequirementsPicker(prev => !prev);
  };

  const toggleDisabilitiesPicker = () => {
    setShowDisabilitiesPicker(prev => !prev);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const generatedPrompt = promptGen(location, selectedStartDate, selectedEndDate, hotelAddress, destinationType, dietaryRequirements, disabilities, activities);
  
      const apiKey = 'enter api key here';
      const apiEndpoint = 'https://api.openai.com/v1/completions';
  
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };
  
      const requestData = {
        model: 'text-davinci-003',
        prompt: generatedPrompt,
        max_tokens: 3000,
      };
  
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const responseData = await response.json();

      const responseText = responseData.choices[0].text;
  
      const parsedResponse = JSON.parse(responseText); // Parse the JSON text

      setResult(parsedResponse);
      setIsLoading(false);
      setShowItinerary(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date.dateString);
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      setSelectedEndDate(date.dateString);
      setShowCalendar(false);
    }
  };

  const popUpCalendar = () => {
    setShowCalendar(prev => !prev); // Reset showCalendar state to false
  };

  const sampleJSON = {
    "itinerary": [
        {
            "day": "1",
            "activities": [
                {
                    "time": "09:00am",
                    "nameOfActivity": "Hiking in Mount Batur",
                    "descriptionOfActivity": "An active volcano and an Ancient Hindu Temple, stunning views of Lake Batur and Mount Abang. Great hike for a great experience.",
                    "locationOfActivity": "Mount Batur, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "2 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "No",
                    "locationOfNearestFood": "Kintamani"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Beaches in Bali",
                    "descriptionOfActivity": "Explore the sandy beaches of Bali and take in the sights of the blue waters.",
                    "locationOfActivity": "Balangan Beach, Bali",
                    "costOfActivity": "Free",
                    "distanceFromAddress": "1 hour from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Jimbaran"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Clubbing in Kuta",
                    "descriptionOfActivity": "Experience the Bali nightlife in Kuta. Visit some of the best clubs in the area and groove to the music.",
                    "locationOfActivity": "Kuta, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "30 minutes from Seminyak",
                    "disabilityFriendly": "Yes",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Kuta"
                }
            ]
        },
        {
            "day": "2",
            "activities": [
                {
                    "time": "09:00am",
                    "nameOfActivity": "Hiking in Ubud",
                    "descriptionOfActivity": "Explore the terraced rice paddies and lush green fields of Ubud with an experienced guide.",
                    "locationOfActivity": "Ubud, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "3 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "No",
                    "locationOfNearestFood": "Ubud"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Beaches in Nusa Dua",
                    "descriptionOfActivity": "Take a walk and relax along the pristine beaches of Nusa Dua, with it's beautiful white sand and clear waters.",
                    "locationOfActivity": "Nusa Dua, Bali",
                    "costOfActivity": "Free",
                    "distanceFromAddress": "3 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Kuta"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Clubbing in Seminyak",
                    "descriptionOfActivity": "Experience the night scene in Seminyak with some of the best clubs and dance the night away.",
                    "locationOfActivity": "Seminyak, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "10 minutes from Seminyak",
                    "disabilityFriendly": "Yes",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Seminyak"
                }
            ]
        },
        {
            "day": "3",
            "activities": [
                {
                    "time": "09:00am",
                    "nameOfActivity": "Hiking in Mount Agung",
                    "descriptionOfActivity": "See the surrounding villages, explore the river valleys and admire the beautiful views that Mount Agung has to offer.",
                    "locationOfActivity": "Mount Agung, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "3 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "No",
                    "locationOfNearestFood": "Candi Dasa"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Beaches in Uluwatu",
                    "descriptionOfActivity": "Stroll along Uluwatu's beautiful cliffs or explore the vibrant beach, perfect for relaxing or some watersports.",
                    "locationOfActivity": "Uluwatu, Bali",
                    "costOfActivity": "Free",
                    "distanceFromAddress": "2 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Kuta"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Clubbing in Canggu",
                    "descriptionOfActivity": "Experience the nightlife in Canggu, dance the night away to the beats of the music and enjoy an unforgettable night.",
                    "locationOfActivity": "Canggu, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "20 minutes from Seminyak",
                    "disabilityFriendly": "Yes",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Canggu"
                }
            ]
        },
        {
            "day": "4",
            "activities": [
                {
                    "time": "09:00am",
                    "nameOfActivity": "Hiking in Mount Rinjani",
                    "descriptionOfActivity": "Experience the beautiful landscape that Mount Rinjani has to offer and visit some ancient temples at the top of the mountain.",
                    "locationOfActivity": "Mount Rinjani, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "4 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "No",
                    "locationOfNearestFood": "Senaru"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Beaches in Uluwatu",
                    "descriptionOfActivity": "Stroll along Uluwatu's beautiful cliffs or explore the vibrant beach, perfect for relaxing or some watersports.",
                    "locationOfActivity": "Uluwatu, Bali",
                    "costOfActivity": "Free",
                    "distanceFromAddress": "2 hours from Seminyak",
                    "disabilityFriendly": "No",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Kuta"
                },
                {
                    "time": "09:00am",
                    "nameOfActivity": "Dance Performance in Bali",
                    "descriptionOfActivity": "Experience one of the most iconic dance performances from Bali in a traditional Balinese setting.",
                    "locationOfActivity": "Ubud, Bali",
                    "costOfActivity": "25 USD",
                    "distanceFromAddress": "3 hours from Seminyak",
                    "disabilityFriendly": "Yes",
                    "isFood": "Yes",
                    "locationOfNearestFood": "Ubud"
                }
            ]
        }
    ],
      "totalCost": "150 USD",
      "error": ""
  }

  if (isLoading) {
    return (
      <View>
        <Text>Your itinerary is being crafted ...</Text>
      </View>
    )
  }

  if (showItinerary && result) {

    return (
      <View style={styles.container}>
        <FlatList 
          data={result.itinerary}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <ItineraryCard itineraryData={item}/>
          )}
        />
        <Button title="Travel Detail Form" onPress={() => setShowItinerary(false)} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please enter your Travel Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableWithoutFeedback onPress={popUpCalendar}>
        <View style={styles.input}>
          <Text style={styles.dateInputText}>
            {selectedStartDate && selectedEndDate
              ? `${selectedStartDate} - ${selectedEndDate}`
              : 'Select Date Range'}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {showCalendar && (
        <View style={styles.calendarContainer}>
          <CalendarList
            current={selectedStartDate || ''}
            markedDates={{
              [selectedStartDate]: { selected: true, startingDay: true, color: 'blue' },
              [selectedEndDate]: { selected: true, endingDay: true, color: 'blue' },
            }}
            onDayPress={handleDateSelect}
            pastScrollRange={0}
            futureScrollRange={1}
            scrollEnabled
            pagingEnabled
            initialScrollIndex={0}
            style={styles.calendarList}
          />
        </View>
      )}

<TextInput
  style={styles.input}
  placeholder="Hotel Address"
  value={hotelAddress}
  onChangeText={setHotelAddress}
/>

{/* Destination Type */}
      <TouchableWithoutFeedback onPress={toggleDestinationTypePicker}>
        <View style={styles.input}>
          <Text style={styles.pickerPlaceholder}>
            {destinationType ? destinationType : 'Select Destination Type'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {showDestinationTypePicker && (
        <Picker
          style={styles.input}
          selectedValue={destinationType}
          onValueChange={setDestinationType}
        >
          <Picker.Item label="Select Destination Type" value="" />
          <Picker.Item label="Single destination" value="Single destination" />
          <Picker.Item label="Multi destination" value="Multi destination" />
        </Picker>
      )}

{/* Dietary Requirements */}
      <TouchableWithoutFeedback onPress={toggleDietaryRequirementsPicker}>
        <View style={styles.input}>
          <Text style={styles.pickerPlaceholder}>
            {dietaryRequirements ? dietaryRequirements : 'Select Dietary Requirements'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {showDietaryRequirementsPicker && (
        <Picker
          style={styles.input}
          selectedValue={dietaryRequirements}
          onValueChange={setDietaryRequirements}
        >
          <Picker.Item label="Select Dietary Requirements" value="" />
          <Picker.Item label="Halal" value="Halal" />
          <Picker.Item label="Vegetarian" value="Vegetarian" />
          <Picker.Item label="No Seafood" value="No Seafood" />
          <Picker.Item label="No food preference" value="No food preference" />
        </Picker>
      )}

{/* Activities */}
  <TextInput
    style={styles.input}
    placeholder="Activities/Attractions you would want to do/visit there"
    value={activities}
    onChangeText={(text) => setActivities(text)}
  />

{/* Disabilities */}
      <TouchableWithoutFeedback onPress={toggleDisabilitiesPicker}>
        <View style={styles.input}>
          <Text style={styles.pickerPlaceholder}>
            {disabilities ? disabilities : 'Any disabilities'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {showDisabilitiesPicker && (
        <Picker
          style={styles.input}
          selectedValue={disabilities}
          onValueChange={setDisabilities}
        >
          <Picker.Item label="Select Disabilities" value="" />
          <Picker.Item label="Not Disabled" value="Not Disabled" />
          <Picker.Item label="Wheelchair Bound" value="Wheelchair Bound" />
        </Picker>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.optionText}>Save Travel Details</Text>
      </TouchableOpacity>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  header: {
    fontSize: 22,
    fontWeight: 'normal',
    marginBottom: 10,
    paddingLeft: 10, 
    paddingTop: 10,
    fontFamily: ''
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A8DADC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    // width: '48%',
    marginTop: 10,
  },
  optionText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  calendarList: {
    width: '100%', // Example: Adjust as needed for responsiveness
    maxWidth: 400, // Example: Limit maximum width for larger screens
    // ... other responsive styles based on screen dimensions
  },
  dateInputText: {
    paddingTop: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default TravelInput;