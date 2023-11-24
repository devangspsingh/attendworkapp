import { View, Text, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'

const StudentRecord = (props) => {
    const { student_record, initial_value } = props


    console.log("initial value", initial_value)
    const [presentState, setPresentState] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    console.log(isEnabled)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        setPresentState(previousState => !previousState)
    };
    useEffect(() => {

        if (initial_value) {
            setIsEnabled(true)
            setPresentState(true)
        }
    })

    return (
        <View key={student_record.uuid}
            style={tw`${presentState ? "bg-green-500" : "bg-red-500"} rounded-full w-full p-4 flex flex-row`}
        >
            <View style={tw`rounded-full w-2/3 px-4`}>
                <Text style={tw` rounded-full`}>{student_record.roll}</Text>
                <Text style={tw` rounded-full font-black text-lg`}>{student_record.name}</Text>
                <Text style={tw` rounded-full`}>{student_record.f_name}</Text>
            </View>
            <View style={tw`rounded-full w-1/3 p-4`}>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? 'blue' : 'grey'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}

export default StudentRecord