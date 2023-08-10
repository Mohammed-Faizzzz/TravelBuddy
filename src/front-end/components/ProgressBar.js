import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, width, height }) => {
  const barWidth = width * progress;
  const progressPercentage = `${Math.round(progress * 100)}%`;
  return (
    <View style = {{flexDirection : 'column', alignItems: 'flex-start'}}>
        <Text style = {styles.txt}>Progress</Text>
    <View style = {{flexDirection : 'row', alignItems: 'center'}}>
    <View style={[styles.progressBar, { width, height }]}>
      <View style={[styles.progress, { width: barWidth }]} />
    </View>
    <Text style = {styles.txt}>{progressPercentage}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: '#F5F5DC',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: '#003A88',
    height: '100%',
  },
  txt: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default ProgressBar;

