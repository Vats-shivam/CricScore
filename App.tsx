import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import 'dotenv/config';

const API_KEY = process.env.API_KEY;

const API_URL = `https://api.cricapi.com/v1/cricScore?apikey=${API_KEY}`;
const CricketMatchCard = ({ match }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.teamDetails,styles.alignItemStart]}>
        {match.t1img && <Image source={{ uri: match.t1img }} style={styles.teamImage} />}
      
      <Text style={[styles.teamName,styles.left]}>{match.t1}</Text>
      {match.ms === "fixture" ? <Text style={styles.matchStatus}>{match.status}</Text>:<Text style={[styles.teamName,styles.left]}>{match.t1s}</Text>}
      
      </View>
      <Text style={styles.teamName}>V/S</Text>
      <View style={[styles.teamDetails,styles.alignItemEnd]}>
        {match.t2img && <Image source={{ uri: match.t2img }} style={styles.teamImage} />}
      <Text style={[styles.teamName,styles.right]}>{match.t2}</Text>
      <Text style={[styles.teamName,styles.right]}>{match.t2s}</Text>
      </View>
    </View>
  );
};

const App = () => {
  const [matches, setMatches] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("hi");
      setMatches(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  setInterval(()=>{
    fetchData();
  },60000)



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {matches && matches.map((match, index) => (
          <CricketMatchCard key={index} match={match} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    color: '#000000',
  },
  teamDetails:{
    display:'flex',
    flexDirection:'column',
    padding:5,
    width:'45%',
  },
  left:{
    textAlign:"left"
  },
  right:{
    textAlign:"right"
  },
  alignItemEnd:{
    alignItems:"flex-end"
  },
  alignItemStart:{
    alignItems:"flex-start"
  },
  matchStatus:{
    color:"#FF0000"
  }
});

export default App;
