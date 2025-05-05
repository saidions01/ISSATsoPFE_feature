import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { format, parseISO } from 'date-fns';
import Header from './Header';
import BottomNav from './components/BottomNav';

const getWeekDay = (isoDate) => {
  const date = parseISO(isoDate);
  return format(date, 'EEEE'); 
};

const TimeTable = ({ navigation }) => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [groupedSoutenances, setGroupedSoutenances] = useState({});
  const [index, setIndex] = useState(0);
  const [routes] = useState(weekDays.map(day => ({ key: day, title: day.slice(0, 3) })));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/soutenances');
        const responseData = await response.json();
        const data = responseData.soutenances || [];

        const grouped = {};
        for (const item of data) {
          const day = getWeekDay(item.date);
          if (!grouped[day]) grouped[day] = [];

          grouped[day].push({
            id: item._id,
            date: item.date,
            time: item.time,
            title: item.sujetPfeId?.title || 'No Title',
            location: item.salleId?.name || 'Unknown Room',
            juryIds: item.assignedProfessors || [],
          });
          console.log('Grouped soutenances:', grouped);
        }

        setGroupedSoutenances(grouped);
      } catch (error) {
        console.error('Failed to fetch soutenances:', error);
      }
    };

    fetchData();
  }, []);

  const renderScene = SceneMap(
    weekDays.reduce((scenes, day) => {
      scenes[day] = () => (
        <View style={styles.scene}>
          {groupedSoutenances[day]?.length > 0 ? (
            <FlatList
              data={groupedSoutenances[day]}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.detail}>Room: {item.location}</Text>
                
                </View>
              )}
            />
          ) : (
            <Text style={styles.empty}>No soutenances scheduled for this day</Text>
          )}
        </View>
      );
      return scenes;
    }, {})
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#2196f3' }}
            style={{ backgroundColor: 'white' }}
            activeColor="#2196f3"
            inactiveColor="gray"
            labelStyle={{ fontSize: 12 }}
          />
        )}
      />
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scene: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  time: {
    color: '#2196f3',
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  detail: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
    fontSize: 14,
  },
});

export default TimeTable;
