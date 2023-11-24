import { View, Text, Pressable, ToastAndroid, ScrollView, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import TetheringManager, { Network, Event, TetheringError } from '@react-native-tethering/wifi';
import requestLocationPermission from '../custom_functions/askPer';
import BackButton from './components/BackButton';
import InfoCard from './components/InfoCard';
import { Socket } from 'react-native-tcp'
import { NativeModules, Platform } from "react-native";


const StudentScreen = (props) => {
    const { back } = props
    const [status, setStatus] = useState(null);

    const { RNNetworkInfo } = NativeModules;

    const getGatewayIPAddress = async () => {
        return await RNNetworkInfo.getGatewayIPAddress();
    }

    const student_details = {
        uuid: "dc9axb6d-0899-4d0a-b208-6b8b46541e86",
        roll: 100200110,
        name: "NOBITA",
        f_name: "Doraemon Singh",
    }
    const [studentSelected, setStudentSelected] = useState(student_details)

    const subject_details = {
        code: "BT509",
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

    const connectToWebsokcet = async (message, ip) => {
        try {
            // Connect to WebSocket
            const client = new Socket();
            client.connect(3000, ip, () => {
                console.log('Connected to WebSocket');
                client.write(JSON.stringify(message));
            });

            // Handle received messages
            client.on('data', (data) => {
                const receivedData = JSON.parse(data.toString());
                console.log(receivedData)
                if (receivedData?.isMarked) {
                    console.log("present lag gyi");
                    setStatus(true)
                    client.destroy();
                }
            });

            // Handle connection errors
            client.on('error', (error) => {
                console.log('WebSocket connection error:', error);
            });

            // Handle connection close
            client.on('close', () => {
                console.log('WebSocket connection closed');
            });
        } catch (error) {
            console.log('Error connecting to WebSocket:', error);
        }
    }

    requestLocationPermission();

    return (
        <ScrollView style={tw`bg-slate-950`}>

            <BackButton pageTitle={"Student Screen"} back={back} />

            <View style={tw`bg-slate-950 flex justify-center items-center`}>
                <InfoCard title={"Student Info"} details={studentSelected} />
                <InfoCard title={"Subject Info"} details={subject_details} />

                <View style={tw`flex flex-row items-stretch justify-between w-full m-4 px-5`}>
                    {status ?
                        <View style={tw`${status ? "bg-green-500" : "bg-slate-400"} p-4 w-full rounded`}>
                            <Text style={tw`font-bold text-center`}>{status ? "Marked Present Successfully" : "Request to Mark Present"}</Text>
                            {console.log(status)}
                        </View>
                        :
                        <Pressable
                            style={tw`bg-blue-500 text-center w-full p-4 flex justify-center rounded`}
                            android_ripple={{ color: '#ccc' }}
                            onPress={async () => {
                                await TetheringManager.setWifiEnabled();
                                const connection_status = await TetheringManager.connectToNetwork({
                                    ssid: subject_details.ssid,
                                    password: subject_details.password,
                                    isHidden: false,
                                    timeout: 10000,
                                })
                                console.log(connection_status)

                                var ip = await getGatewayIPAddress()
                                // console.log(ip)
                                if (!ip) {
                                    ip = '127.0.0.1'
                                }
                                console.log(ip)
                                connectToWebsokcet({ studentSelected }, ip)
                            }}
                        >
                            <Text style={tw`text-center font-bold text-black`}>Mark My Attendance</Text>
                        </Pressable>}

                </View >

                <View style={tw`flex items-stretch justify-between w-full m-4 px-5 gap-4`}>
                    <Text style={tw`text-lg font-bold`}>Select Student for testing</Text>
                    {all_students.map((record) => (
                        <View key={record.uuid} style={tw``}>
                            <Pressable android_ripple={{ color: '#ccc' }} style={tw`w-full bg-slate-500 rounded-md p-4`} onPress={() => {
                                setStudentSelected(record)
                                setStatus(false)
                            }}>
                                <Text>{record.name}</Text>
                            </Pressable>
                        </View>

                    ))}
                </View>
            </View>
        </ScrollView >
    )
}

export default StudentScreen