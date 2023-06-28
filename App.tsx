/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Button
} from 'react-native';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';


type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {

  const askForPermission = (permission: any) => {
    request(permission).then(result => {
      console.log(result)
    })
  }
  const checkForPermission = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });

  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>React Native Permissions</Text>
        <View style={styles.button}>
          <Button title={'Images'} onPress={() => askForPermission(PERMISSIONS.ANDROID.CAMERA)} />
          <Button title={'Storage'} onPress={() => askForPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)} />
          <Button title={'Contacts'} onPress={() => askForPermission(PERMISSIONS.ANDROID.WRITE_CONTACTS)} />
          <Button title={'Location'} onPress={() => askForPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,

  },
  text: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    color: 'white',
    display: 'flex',
    gap: 15,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  }
});

export default App;
