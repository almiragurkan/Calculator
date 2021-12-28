import React, { FC } from "react"
import { Dimensions, /* ImageStyle, */ Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
/*   AutoImage as Image, */
  GradientBackground, CreateDigits, CreateOperands, CreateFeatures,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
export const logoIgnite = require("./logo-ignite.png")
export const logoUpvibe = {uri: 'https://upvibe.net/img/logo2.png'}

const sHeight = Dimensions.get("screen").height

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[2] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export const DemoScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const n1 = ""


    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="demoScreen.calculator"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          {/* <Image source={logoUpvibe} style={IGNITE} /> */}
          <View style={{flex:1, height:sHeight * 0.91}}>
            <View style={{flex:0.4,flexDirection: "row", backgroundColor: 'white '}}>
              <Text style={{color:'white', fontSize:50}}>Ekran (calc yazdır) </Text>
            </View>
            <View style={{flex:0.6, flexDirection:"column",backgroundColor:'white'}}>
              <CreateFeatures containerStyle={{flex:0.2}} buttonStyle={{backgroundColor:'lightblue'}}/>
              <View style={{flex:0.8, flexDirection:"row"}}>
                <View style={{flex:0.75,flexDirection: "column"}}>
                  <CreateDigits number1={n1}/>
                </View>
                <CreateOperands containerStyle={{flex:0.25,flexDirection: "column"}} buttonStyle={{backgroundColor:'lightsteelblue'}}/>
              </View>
            </View>
          </View>

        </Screen>
      </View>
    )
  },
)
