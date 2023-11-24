import { View, Text, Pressable, ToastAndroid, ScrollView, PermissionsAndroid, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import TetheringManager, { Network, Event, TetheringError } from '@react-native-tethering/wifi';
import HotspotManager from '@react-native-tethering/hotspot';
import requestLocationPermission from '../custom_functions/askPer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from './components/BackButton';
import InfoCard from './components/InfoCard';
import StudentRecord from './components/StudentRecord';
import { Server } from 'react-native-tcp';

const TeacherScreen = (props) => {
    const { back } = props


    const subject_details = {
        ssid: "BT509hsgy11",
        password: "strongpassword"
    }

    const all_students = [
        {
            uuid: "dc9axb6d-0899-4d0a-b208-6b8b46541e86",
            roll: 100200110,
            name: "NOBITA",
            f_name: "Doraemon Singh",
        },

        {
            uuid: "dc9abb6d-0893-4x06-b208-6b8b46541e86",
            roll: 100200111,
            name: "Nobita Patel",
            f_name: "GIAN Singh",
        },

        {
            uuid: "dc9abb6d-0893-4d06-e208-6b8b46541e86",
            roll: 100200112,
            name: "Shinchan",
            f_name: "Sunio Singh",
        },

        {
            uuid: "dc9abb6d-0892-4d06-b208-6bxb46541e86",
            roll: 100200113,
            name: "Pinky Jojo",
            f_name: "Raju Raj",
        },

        {
            uuid: "dc9abb6d-0891-4d06-b208-6b8b465x1e86",
            roll: 100200114,
            name: "Kajal Soni",
            f_name: "Jacob Soni",
        },
        {
            uuid: "dc9abb6d-0849-4d06-b208-6b8b4x541e86",
            roll: 10020011,
            name: "Raju Patel",
            f_name: "Sunooo singh",
        },

    ]
    const [studentsState, setStudentsState] = useState(all_students);

    const lecturer_details = {
        sub_code: "BT509",
        uni_code: "2892",
        hash: "hsgty"
    }


    useEffect(() => {
        const server = new Server();

        server.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('data', (data) => {
                var Jsondata = JSON.parse(data);
                // console.log(Jsondata.studentSelected.uuid)

                const isJsondataInStudents = all_students.find(student => student.uuid === Jsondata.studentSelected.uuid)

                if (isJsondataInStudents) {
                    console.log('Jsondata is in all_students array');
                    isJsondataInStudents.is_marked = true;
                    setStudentsState(prevState => [...all_students]);
                    // console.log(all_students)
                    socket.write(JSON.stringify({
                        message: "Marked Successfully",
                        isMarked: true
                    }))
                } else {
                    console.log('Jsondata is not in all_students array');
                }
            });

            socket.on('error', (error) => {
                console.log('Socket error:', error);
            });

            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });

        server.on('error', (error) => {
            console.log('Server error:', error);
        });

        server.listen(3000, '0.0.0.0', () => {
            console.log('Server listening on port 3000');
        });

        // return () => {
        //     server.close();
        // };
    }, []);


    lecturer_details.ssid = lecturer_details.sub_code + lecturer_details.uni_code + lecturer_details.hash
    requestLocationPermission()

    return (
        <ScrollView style={tw`bg-slate-950`}>

            <BackButton pageTitle={"TeacherScreen"} back={back} />

            <View style={tw`bg-slate-950 flex justify-center items-center`}>
                <InfoCard title={"Subject Info"} details={subject_details} />


                <View style={tw`flex flex-row items-stretch justify-between w-full m-4 px-5`}>

                    <Pressable
                        style={tw`bg-green-400 text-center w-30 w-full flex justify-center p-2 rounded-lg`}
                        android_ripple={{ color: '#fff' }}
                        onPress={async () => {
                            try {
                                const state = await HotspotManager.isWriteSettingsGranted();
                                if (!state) {
                                    await HotspotManager.openWriteSettings();
                                }
                                else {
                                    ToastAndroid.show("Permission enabled", ToastAndroid.LONG);
                                }

                            } catch (error) {
                                if (error instanceof TetheringError) {
                                    ToastAndroid.show(error.message, ToastAndroid.LONG);
                                }
                                console.log(error);
                            }
                        }}>
                        <Text style={tw`text-center text-black`}>
                            Give permisson
                        </Text>
                    </Pressable>



                </View >


                <View style={tw`flex flex-row items-stretch justify-between w-full m-4 px-5`}>

                    <Pressable
                        style={tw`bg-green-400 text-center w-1/3 h-20 flex justify-center p-2 rounded-lg`}
                        android_ripple={{ color: '#fff' }}
                        onPress={async () => {
                            try {
                                await HotspotManager.setHotspotEnabled(true)
                                const devices = await HotspotManager.getConnectedDevices();
                                console.log(devices, dev2)
                                const dev2 = await HotspotManager.isHotspotEnabled();
                                // setDevices(devices)
                            } catch (error) {
                                if (error instanceof TetheringError) {
                                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                                }
                                console.log(error);

                            }
                        }}
                    >
                        <Text style={{ color: '#000' }}>Start Taking Attendance</Text>
                    </Pressable>



                    <Pressable
                        style={tw`bg-red-500 text-center w-1/3 h-20 flex justify-center p-2 rounded-lg`}
                        android_ripple={{ color: '#fff' }}
                        onPress={async () => {
                            try {
                                await HotspotManager.setHotspotEnabled(false);
                                ToastAndroid.show('Hotspot Disabled', ToastAndroid.SHORT)
                            } catch (error) {
                                if (error instanceof TetheringError) {
                                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                                }
                                console.log(error);

                            }
                        }}
                    >
                        <Text style={{ color: '#000' }}>Stop Taking Attendance</Text>
                    </Pressable>
                </View >

                <View style={tw`flex gap-2 justify-between w-full m-4 px-5`}>

                    <Text style={tw`text-xl font-bold flex gap-2 justify-between w-full m-4 px-5`}>
                        Students</Text>

                    {studentsState.map((student) => (
                        <StudentRecord key={student.uuid} student_record={student} initial_value={student.is_marked} />
                    ))}


                </View>


            </View>
        </ScrollView >
    )
}

export default TeacherScreen