import * as React from 'react';

import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import TeacherScreen from './src/TeacherScreen';
import StudentScreen from './src/StudentScreen';
import tw from 'twrnc';

export default function App() {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (selected === 'student') {
    return <StudentScreen back={() => setSelected(null)} />;
  }
  if (selected === 'teacher') {
    return <TeacherScreen back={() => setSelected(null)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={tw`text-xl font-extrabold p-5`}>ATTEND WORK</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#fff'}}
          onPress={() => setSelected('student')}>
          <Text style={styles.buttonText}>I am a Student</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#fff'}}
          onPress={() => setSelected('teacher')}>
          <Text style={styles.buttonText}>I am a Teacher</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    padding: 14,
    backgroundColor: '#359962',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  headerImg: {
    width: 200,
    height: 200,
  },
});
