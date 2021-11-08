import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WEEKDAYS } from '../utils/constants';
import { ConfigsContext } from './TimeTable';

export default function WeekdayText() {
  const configs = useContext(ConfigsContext);
  const { cellWidth, numOfDays, locale } = configs;
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
  const styles = getStyles({ cellWidth });

  return (
    <>
      {Array.from({ length: numOfDays }, (_, i) => 1 + i).map((day, index) => {
        const differenceOfDate = day - currentWeekday;
        const thatDay = new Date();
        thatDay.setDate(new Date().getDate() + differenceOfDate);
        return (
          <View key={`weekday-${day}`} style={[styles.weekdayCell, index === 0 && {borderLeftWidth: 1}, index === 4 && { borderRightWidth: 1 }]}>
            <Text
              style={[
                styles.weekdayText,
                currentWeekday === day && styles.weekdayTextHighlight,
              ]}
            >
              {`${WEEKDAYS?.[locale || 'en']?.[day - 1]}`}
            </Text>
          </View>
        );
      })}
    </>
  );
}

const getStyles = ({ cellWidth }) =>
  StyleSheet.create({
    weekdayCell: {
      width: cellWidth,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'rgba(12, 12, 12, 0.1)',
    },
    weekdayTextHighlight: {
      fontWeight: 'bold',
    },
    weekdayText: {
      fontSize: 15,
      color: 'black',
    },
  });
