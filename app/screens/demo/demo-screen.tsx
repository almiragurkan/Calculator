import React, { FC, useState } from "react"
import { Dimensions, ScrollView, /* ImageStyle, */ Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  /*   AutoImage as Image, */
  GradientBackground, CustomButton,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"

export const logoIgnite = require("./logo-ignite.png")
export const logoUpvibe = { uri: "https://upvibe.net/img/logo2.png" }

const sHeight = Dimensions.get("screen").height
const sWidth = Dimensions.get("screen").width
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
  color: "lightsteelblue"
}
const BUTTON: ViewStyle = {
  flex: undefined,
  width:'33.33%',
  height:'25%'
}

export const DemoScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const [number1, setNumber1] = useState("")
    const [number2, setNumber2] = useState("")
    const [operand, setOperand] = useState("")
    const [display, setDisplay] = useState("")
    const [displayResult, setDisplayResult] = useState("")


    const operands = ["+" ,"-","*","/","%"]
    const numerals = ["1","2","3","4","5","6","7","8","9","0","."]

    const updateCalc = (digit) => {
      setDisplayResult("")
      if (operands.includes(digit)) {
        if(operand.length<1){
          if(number1 ===''){
            setOperand("")
            setDisplay("")
          }else{
            setOperand(digit);
            setDisplay(number1 + digit)}

        }else if(operand.length>0){
          if(number2 === ''){
            return null;
          }
          else {
            setDisplayResult('=' + chooseAction(operand).toString())
            setNumber1(chooseAction(operand).toString())
            setNumber2("")
            setOperand(digit)
          }
        }
      }else if(numerals.includes(digit)){
          if (operand === '') {
            setNumber1(number1 + digit)
            console.log(number1 + digit)
            setDisplay(number1 + digit)
          }else {
            setNumber2(number2 + digit)
            console.log(number1, " ", operand, " ", number2 + digit)
            setDisplay(number1 + operand +  number2 + digit)
          }
      }else if(digit === '='){
        if((number1 === '' || number2 === '')){
          return null;
        }else{
        console.log(number1, " ", operand, " ", number2, "=")
        setDisplayResult('=' + chooseAction(operand).toString())
        console.log(chooseAction(operand))
        setNumber1(chooseAction(operand).toString())
        setOperand("")
        setNumber2("")
        }
      }else if(digit === 'AC'){
        setDisplay("")
        setDisplayResult("")
        resetRegisters()
      }else if(digit==='C'){
        if(number2.length>0){
          setNumber2("")
          setDisplay(number1+operand)
          console.log(display)
        }else if(operand.length>0){
          setOperand("")
          setDisplay(number1)
          console.log(display)
        }else if(number1.length>0){
          setNumber1("")
          setDisplay("")
          console.log(display)
        }
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
        case'%':
          return percentage(number1, number2);
        default:
          return null;
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
    const percentage = (number1, number2) => {
      return (parseFloat(number1) / 100 * number2) ;

    }

    const resetRegisters = () => {
      setNumber1("")
      setNumber2("")
      setOperand("")
    }



    const digits = []
      for (let i = 1; i < 10; i++) {
        digits.push(
          <CustomButton buttonStyles={{flex: undefined, width: "33.33%", height: "25%"}}
                        key={"btn_" + i.toString()} buttonName={i.toString()}
                        onPress={() => updateCalc(i.toString())}/>
        )
      }


    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="demoScreen.calculator"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          {/* <Image source={logoUpvibe} style={IGNITE} /> */}
          <View style={{ flex: 1, height: sHeight * 0.91 }}>
            <ScrollView style={{ flex: 0.4, flexDirection: "column", backgroundColor: "white ", }}>
              <Text style={{ flex:0.75, color: "black", fontSize: 50, width:sWidth*0.95}}>
                {display}
              </Text>
              <Text style={{ flex:0.25, color: "black", fontSize: 50, width:sWidth*0.95}}>
                {displayResult}
              </Text>
            </ScrollView>
            <View style={{ flex: 0.6, flexDirection: "column", backgroundColor: "white" }}>
              <View style={{ flex: 0.2, justifyContent: "center", flexDirection: "row" }}>
                <CustomButton buttonStyles={{ backgroundColor: "lightblue" }} buttonName={"AC"} onPress={() => updateCalc('AC')} />
                <CustomButton buttonStyles={{ backgroundColor: "lightblue" }} buttonName={"C"} onPress={() => updateCalc('C')}/>
                <CustomButton buttonStyles={{ backgroundColor: "lightblue" }} buttonName={"%"} onPress={() => updateCalc('%')}/>
                <CustomButton buttonStyles={{ backgroundColor: "lightblue" }} buttonName={""}/>
              </View>
              <View style={{ flex: 0.8, flexDirection: "row" }}>
                <View style={{ flex: 0.75, flexDirection: "column" }}>
                  <View style={{flexWrap:"wrap", justifyContent: "center", flexDirection: "row", flex:1}}>
                    {digits}
                    <CustomButton buttonStyles={BUTTON} buttonName={"0"} onPress={() => updateCalc('0')}/>
                    <CustomButton buttonStyles={BUTTON} buttonName={"."} onPress={() => updateCalc('.')}/>
                    <CustomButton buttonStyles={BUTTON} buttonName={"="} onPress={() => updateCalc('=')}/>
                  </View>
                </View>
                <View style={{ flex: 0.25, flexDirection: "column", justifyContent: "center"}}>

                  <CustomButton buttonStyles={{ backgroundColor: "lightsteelblue" }} buttonName={"+"} onPress={() => updateCalc('+')}/>
                  <CustomButton buttonStyles={{ backgroundColor: "lightsteelblue" }} buttonName={"-"} onPress={() => updateCalc('-')}/>
                  <CustomButton buttonStyles={{ backgroundColor: "lightsteelblue" }} buttonName={"/"} onPress={() => updateCalc('/')}/>
                  <CustomButton buttonStyles={{ backgroundColor: "lightsteelblue" }} buttonName={"*"} onPress={() => updateCalc('*')}/>
                </View>
              </View>
            </View>
          </View>

        </Screen>
      </View>
    )
  },
)
