import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SearchBar: React.FC = () => {
  return (
    <View style={styles.topIcons}>
      <TouchableOpacity style={styles.topIcon}>
        <View style={styles.giftIcon}>
          <Text style={styles.iconText}>🎁</Text>
        </View>
        <Text style={styles.topIconText}>抽奖</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Text style={styles.searchPlaceholder}>🔍 分期借钱</Text>
      </View>

      <TouchableOpacity style={styles.topIcon}>
        <View style={styles.micIcon}>
          <Text style={styles.iconText}>🎤</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.topIcon}>
        <View style={styles.versionIcon}>
          <Text style={styles.iconText}>📱</Text>
        </View>
        <Text style={styles.topIconText}>版本</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.topIcon}>
        <View style={styles.serviceIcon}>
          <Text style={styles.iconText}>🎧</Text>
        </View>
        <Text style={styles.topIconText}>客服</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.topIcon}>
        <View style={styles.messageBadge}>
          <Text style={styles.badgeText}>200</Text>
        </View>
        <View style={styles.messageIcon}>
          <Text style={styles.iconText}>💌</Text>
        </View>
        <Text style={styles.topIconText}>消息</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  topIcon: {
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative',
  },
  iconText: {
    fontSize: 20,
    marginBottom: 2,
  },
  topIconText: {
    fontSize: 10,
    color: 'white',
    marginTop: 2,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#666',
  },
  messageBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 20,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  giftIcon: {},
  micIcon: {},
  versionIcon: {},
  serviceIcon: {},
  messageIcon: {},
});

export default SearchBar;