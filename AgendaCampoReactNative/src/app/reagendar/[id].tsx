import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Box,
    Btn,
    BtnText,
    Card,
    Center,
    Colors,
    Column,
    Container,
    H1,
    H2,
    H3,
    H4,
    Line,
    P,
    Row,
    Scroll,
} from "../../constants/theme";
import { ScrollView } from 'react-native';
export const Reagendar = () => {
    return (
        <SafeAreaView style={Container} edges={["left", "right"]}>


            <ScrollView
                contentContainerStyle={Scroll}
                showsVerticalScrollIndicator={false}
                >
                
            </ScrollView>
        </SafeAreaView>
    )
}
