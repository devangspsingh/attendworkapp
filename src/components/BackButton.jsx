import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';

import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton = (props) => {
    const { back, pageTitle } = props
    return (
        <View style={tw`flex flex-row p-2 rounded-md m-2 items-center justify-between bg-slate-800`}>
            <Pressable style={tw`flex items-start justify-center`} android_ripple={{ color: '#fff' }} onPress={back}>
                <Text style={tw`font-bold text-base`}><Icon name="keyboard-backspace" size={22} color="white" /></Text>
            </Pressable>
            <Text style={tw` text-white font-bold text-xl`}>
                {pageTitle}
            </Text>
            <Text></Text>

        </View>
    )
}

export default BackButton