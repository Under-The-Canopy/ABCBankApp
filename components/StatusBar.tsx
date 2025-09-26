import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface StatusBarProps {
  time: string;
}

const StatusBar: React.FC<StatusBarProps> = ({time}) => {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.timeText}>{time}</Text>
      <View style={styles.statusIcons}>
        <Text style={styles.signalText}>••••• 5G</Text>
        <View style={styles.batteryContainer}>
          <View style={styles.battery}>
            <View style={styles.batteryLevel} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalText: {
    fontSize: 12,
    color: 'white',
    marginRight: 8,
  },
  batteryContainer: {
    marginLeft: 5,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  batteryLevel: {
    position: 'absolute',
    left: 1,
    top: 1,
    bottom: 1,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 1,
  },
});

export default StatusBar;