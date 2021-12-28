import React, { FC, useState } from "react"
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

/* const IGNITE: ImageStyle = {
  marginVertical: spacing[1],
  alignSelf: "center",
  width: 45,
  height: 25,
} */

export const DemoScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const n1 = ""

/*
    const[calc,setCalc] = useState("")
    const[result,setResult] = useState("")

    const ops=["*","/","-","+","%",","]

    const calculate = value =>{
      if(ops.includes(value) && calc ==="")
      {
        return; /!* burada +/- tuşuna basılması lazım *!/
      }else if (ops.includes(value)){
        switch (value) {
          case '+':
            return setResult();
          case '-':
            return setResult();
          case '/':
            return setResult();
          case '*':
            return setResult();
        }
      }
      setCalc(calc+value);
    }

    const evaluation = () =>{
      setCalc(eval(calc).toString())
    }

/!* eval diye bir fonksiyon varmış sor *!/
*/
    const [number1, setNumber1] = useState("0")
    const [number2, setNumber2] = useState("0")
    const [operand, setOperand] = useState("0")

    export const calculate = (value) => {
      switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
          setOperand(value)
          console.log(number1, " ", operand, " ")
          break;
        case'1':
        case'2':
        case'3':
        case'4':
        case'5':
        case'6':
        case'7':
        case'8':
        case'9':
        case'0':
          if (operand === '') {
            setNumber1(number1 + value)
            console.log(number1)
          } else {
            setNumber2(number2 + value)
            console.log(number1, " ", operand, " ", number2)
          }
          break;
        case'=':
          console.log(number1, " ", operand, " ", number2, "=");
          chooseAction(operand)
          console.log(chooseAction(operand))
          break;
        case'AC':
          resetRegisters()
      }
    }

    const chooseAction = (operand) => {
      switch (operand) {
        case '+':
          return addition(number1, number2);
        case '-':
          return subtraction(number1, number2);
        case '/':
          return division(number1, number2);
        case '*':
          return multiplication(number1, number2);
      }
    }

    const addition = (number1, number2) => {
      return parseFloat(number1) + parseFloat(number2);
    }

    const subtraction = (number1, number2) => {
      return parseFloat(number1) - parseFloat(number2)
    }

    const division = (number1, number2) => {
      return parseFloat(number1) / parseFloat(number2);
    }

    const multiplication = (number1, number2) => {
      return parseFloat(number1) * parseFloat(number2);
    }

    const resetRegisters = () => {
      setNumber1("")
      setNumber2("")
      setOperand("")
    }

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
