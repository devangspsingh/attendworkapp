import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const InfoCard = (props) => {
    const { details, title } = props
    return (
        <View style={tw`gap-2 p-5 rounded-md m-5 my-2 bg-slate-800`}>
            <Text style={tw`font-bold`}>{title}</Text>
            {Object.keys(details).map((key) => (
                <View key={key} style={tw`text-white flex flex-row mx-auto text-center`}>

                    <Text style={tw`font-bold w-1/3 text-left`}>
                        {key}:
                    </Text>
                    <View style={tw`font-bold w-2/3`}>
                        <Text style={tw`font-bold text-left`}>
                            {details[key]}
                        </Text>
                    </View>



                </View>
            ))}

        </View>
    )
}

export default InfoCard