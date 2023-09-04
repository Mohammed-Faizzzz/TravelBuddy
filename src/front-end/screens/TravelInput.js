import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, TouchableWithoutFeedback, Button, Modal, Keyboard, KeyboardAvoidingView } from 'react-native';
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

  const [calendarOpen, setCalendarOpen] = useState(false);

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

  // replace the handle form with this on actual code to use ChatGPT api
  const handleSave = async () => {
    try {
      setIsLoading(true);

      const generatedPrompt = promptGen(location, selectedStartDate, selectedEndDate, hotelAddress, destinationType, dietaryRequirements, disabilities, activities);
  
      const apiKey = 'add your api key here';
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

  // use this for form submit for testing purposes
  const handleSaveTesting = () => {
    setResult(sampleJSON);
    setIsLoading(false);
    setShowItinerary(true);
  }

  const handleDateSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date.dateString);
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      setSelectedEndDate(date.dateString);
      setShowCalendar(false);
    }
  };

  const handleDestination = (dest) => {
    setDestinationType(dest);
    setShowDestinationTypePicker(false);
  }

  const handleDietaryReq = (diet) => {
    setDietaryRequirements(diet);
    setShowDietaryRequirementsPicker(false);
  } 

  const handleDisabled = (dis) => {
    setDisabilities(dis);
    setShowDisabilitiesPicker(false);
  }

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
                    "distanceFromAddress": "2 hours",
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
                    "distanceFromAddress": "1 hour",
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
                    "distanceFromAddress": "30 minutes",
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
                    "distanceFromAddress": "3 hours",
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
                    "distanceFromAddress": "3 hours",
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
                    "distanceFromAddress": "10 minutes",
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
                    "distanceFromAddress": "3 hours",
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
                    "distanceFromAddress": "2 hours",
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
                    "distanceFromAddress": "20 minutes",
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
                    "distanceFromAddress": "4 hours",
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
                    "distanceFromAddress": "2 hours",
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
                    "distanceFromAddress": "3 hours",
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
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
      <ScrollView 
        style={styles.container}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.header}>Please enter your Travel Details</Text>

        {/** LOCATION */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </TouchableWithoutFeedback>



        {/** DATES */}
        <TouchableOpacity onPress={() => setCalendarOpen(!calendarOpen)} style={styles.input}>
          <Text style={styles.dateInputText}>
            {selectedStartDate && selectedEndDate
              ? `${selectedStartDate} - ${selectedEndDate}`
              : 'Select Date Range'}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={calendarOpen}
        >
          <View style={styles.modalView}>
            <CalendarList
              current={selectedStartDate || ''}
              markedDates={{
                [selectedStartDate]: { selected: true, startingDay: true, color: 'blue' },
                [selectedEndDate]: { selected: true, endingDay: true, color: 'blue' },
              }}
              onDayPress={handleDateSelect}
              pastScrollRange={0}
              futureScrollRange={2}
              scrollEnabled
              pagingEnabled
              initialScrollIndex={0}
            />

            <TouchableOpacity  
              onPress={() => setCalendarOpen(!calendarOpen)}
              style={styles.calendarButton}
            >
              <View style={{backgroundColor: 'lightblue', padding: 10, borderRadius: 20, border: 0, width: '90%', alignItems: 'center' }}>
                <Text >Select Dates</Text>
              </View>
            </TouchableOpacity>
          </View>

        </Modal>

        {/** Hotel Address */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.input}
            placeholder="Hotel Address"
            value={hotelAddress}
            onChangeText={setHotelAddress}
          />
        </TouchableWithoutFeedback>


        {/* Destination Type */}
        <View style={styles.input}>
            <TouchableOpacity onPress={() => setShowDestinationTypePicker(!showDestinationTypePicker)}>
              <Text>
                {destinationType ? destinationType : 'Select Destination Type'}
              </Text>
            </TouchableOpacity>
          </View>
          {
            showDestinationTypePicker && (
              <Picker
              selectedValue={destinationType}
              onValueChange={handleDestination}
              style={styles.dropdown}
              >
                <Picker.Item label="Select Destination Type" value=""/>
                <Picker.Item label="Single destination" value="Single destination" />
                <Picker.Item label="Multi destination" value="Multi destination" />
              </Picker>
            )
          }

        {/* Dietary Requirements */}
        <View style={styles.input}>
          <TouchableOpacity onPress={() => setShowDietaryRequirementsPicker(!showDietaryRequirementsPicker)}>
            <Text>
              {dietaryRequirements ? dietaryRequirements : 'Select Dietary Requirements'}
            </Text>
          </TouchableOpacity>
        </View>
        {
          showDietaryRequirementsPicker && (
            <Picker
            selectedValue={dietaryRequirements}
            onValueChange={handleDietaryReq}
            style={styles.dropdown}
            >
              <Picker.Item label="Select Dietary Requirements" value="" />
              <Picker.Item label="Halal" value="Halal" />
              <Picker.Item label="Vegetarian" value="Vegetarian" />
              <Picker.Item label="No Seafood" value="No Seafood" />
              <Picker.Item label="No food preference" value="No food preference" />
            </Picker>
          )
        }

        {/* Activities */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.input}
            placeholder="Activities/Attractions you would want to do/visit there"
            value={activities}
            onChangeText={(text) => setActivities(text)}
          />
        </TouchableWithoutFeedback>


        {/* Disabilities */}
        <View style={styles.input}>
          <TouchableOpacity onPress={() => setShowDisabilitiesPicker(!showDisabilitiesPicker)}>
            <Text>
              {disabilities ? disabilities : 'Any disabilities'}
            </Text>
          </TouchableOpacity>
        </View>
        {
          showDisabilitiesPicker && (
            <Picker
            selectedValue={dietaryRequirements}
            onValueChange={handleDisabled}
            style={styles.dropdown}
            >
              <Picker.Item label="Select Disabilities" value="" />
              <Picker.Item label="Not Disabled" value="Not Disabled" />
              <Picker.Item label="Wheelchair Bound" value="Wheelchair Bound" />
            </Picker>
          )
        }

        <TouchableOpacity style={styles.button} onPress={handleSaveTesting}>
          <Text style={styles.optionText}>Save Travel Details</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    paddingLeft: 10, 
    paddingTop: 10
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
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  calendarList: {
    width: '90%',
  },
  dateInputText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    paddingTop: 100,
    paddingBottom: 100
  },
  calendarButton: {
    padding: 20, 
    backgroundColor: 'white', 
    width: "100%", 
    borderRadius: 20, 
    alignItems: 'center'
  },
  dropdown: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowColor: '#000',
    borderColor: 'gray',
    borderWidth: 2,
  }
});

export default TravelInput;