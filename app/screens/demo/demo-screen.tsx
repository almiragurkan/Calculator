import React, { FC, useState } from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  GradientBackground, CustomButton,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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
  color: "#696868",
}
const  DISPLAY: ViewStyle = {
  flex:0.4,
  flexDirection: "column",
  justifyContent:"flex-end",
  alignItems:"flex-end",
  backgroundColor:"rgb(0,0,0)" }
const DISPLAY_TEXT: TextStyle = {
  color: "rgba(192,191,191,0.78)",
  fontSize: 35,
  paddingEnd: 10,
  textAlign:"right"
}
const DISPLAY_RESULT_TEXT: TextStyle = {
  color: "white",
  fontSize: 55,
  paddingEnd: 10,
  textAlign:"right",
  marginBottom: 25
}
const  KEYBOARD_BACK: ViewStyle = {
  flex: 0.6,
  flexDirection:"row"
}
const  STYLE_VIEW1: ViewStyle = {
  flex:0.75,
  flexDirection: "column",
  alignContent:"space-around",
  paddingTop:10, paddingStart:10,
  paddingBottom:10
}
const STYLE_INNER_VIEW1: ViewStyle = {
  flex:0.2,
  flexDirection: "row"
}
const STYLE_VIEW2: ViewStyle = {
  flex:0.25,
  flexDirection: "column",
  alignContent:"space-around",
  paddingTop:10,
  paddingEnd:10,
  paddingBottom:10
}
const STYLES_OPERAND_BUTTON_BASIC: ViewStyle = {
  backgroundColor: "#052a34"
}
const STYLES_EQUAL_BUTTON_BASIC: ViewStyle = {
  backgroundColor: "rgb(2,191,194)"
}

export const DemoScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("info")

    const [number1, setNumber1] = useState("")
    const [number2, setNumber2] = useState("")
    const [operand, setOperand] = useState("")
    const [specialOperand, setSpecialOperand] = useState("")
    const [display, setDisplay] = useState("0")
    const [displayResult, setDisplayResult] = useState("0")
    const [history, setHistory] = useState("")


    const operands = ["+", "-", "x", "/", "%","^"]
    const specialOperands = ["√","∛","²","³"]
    const numerals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]

    const updateCalc = (digit) => {

      if (operands.includes(digit)) {
        if (operand.length < 1) {
          setDisplayResult("")
          if (number1 === "") {
            setOperand("")
            setDisplay("")
          } else {
            setOperand(digit)
            setDisplay(number1 + digit)
          }
        } else if (operand.length > 0) {
          setOperand(digit)
          if (number2 === "") {
            setDisplayResult("")
            setDisplay(number1 + digit)
            return null
          } else {
            setDisplayResult(chooseAction(operand).toString())
            setHistory(history + "\n" + display)
            setNumber1(chooseAction(operand).toString())
            setNumber2("")
            setOperand(digit)
          }
        }
      }else if(specialOperands.includes(digit)){
          setSpecialOperand(digit)
          if (digit==="√" || digit==="∛"){
            setDisplay(digit + number1)
            __DEV__ && console.log(digit + number1)
          }else{
            setDisplay(number1 + digit)
            __DEV__ && console.log(number1 + digit)
          }
          setDisplayResult(chooseSpecialAction(digit).toString())
          __DEV__ && console.log(chooseSpecialAction(digit))
          setNumber1(chooseSpecialAction(digit).toString())

      }else if (numerals.includes(digit)) {
        setDisplayResult("")
        if (operand === "") {
          setNumber1(number1 + digit)
          __DEV__ && console.log(number1 + digit)
          setDisplay(number1 + digit)
        }else {
          setNumber2(number2 + digit)
          __DEV__ && console.log(number1, " ", operand, " ", number2 + digit)
          setDisplay(number1 + operand + number2 + digit)
        }
      } else if (digit === "=") {
        if (number1 === "" || number2 === "") {
          return null
        } else {
          __DEV__ && console.log(number1, " ", operand, " ", number2, "=")
          setHistory(history + "\n" + display)
          setDisplayResult(chooseAction(operand).toString())
          __DEV__ && console.log(chooseAction(operand))
          setNumber1(chooseAction(operand).toString())
          setNumber2("")

        }
      } else if (digit === "AC") {
        setDisplay("0")
        setDisplayResult("0")
        resetRegisters()
        setHistory("")
      } else if (digit === "C") {
        if (number2.length > 0) {
          setNumber2("")
          setDisplay(number1 + operand)
          __DEV__ && console.log(display)
        } else if (operand.length > 0) {
          setOperand("")
          setDisplay(number1)
          __DEV__ && console.log(display)
        } else if (number1.length > 0) {
          setNumber1("")
          setDisplay("")
          __DEV__ && console.log(display)
        }
      }
    }


    const chooseAction = (operand) => {
      switch (operand) {
        case "+":
          return addition(number1, number2)
        case "-":
          return subtraction(number1, number2)
        case "/":
          return division(number1, number2)
        case "x":
          return multiplication(number1, number2)
        case "%":
          return percentage(number1, number2)
        case "^":
          return exponential(number1,number2)
        default:
          return null
      }
    }
    const chooseSpecialAction = (specialOperand) => {
      switch (specialOperand) {
        case "√":
          return squareRoot(number1)
        case "∛":
          return cubeRoot(number1)
        case "²":
          return square(number1)
        case "³":
          return cube(number1)
        default:
          return null
      }
    }

    const addition = (number1, number2) => {
      return ((parseFloat(number1)) + (parseFloat(number2)))
    }

    const subtraction = (number1, number2) => {
      return ((parseFloat(number1)) - (parseFloat(number2)))
    }

    const division = (number1, number2) => {
      return ((parseFloat(number1)) / (parseFloat(number2)))
    }

    const multiplication = (number1, number2) => {
      return ((parseFloat(number1)) * (parseFloat(number2)))
    }
    const percentage = (number1, number2) => {
      return ((parseFloat(number1)) / 100 * (parseFloat(number2)))
    }
    const squareRoot = (number1) => {
      return (Math.sqrt(parseFloat(number1)))
    }
    const cubeRoot = (number1) => {
      return (Math.cbrt((parseFloat(number1))))
    }
    const square = (number1) => {
      return (Math.pow((parseFloat(number1)),2))
    }
    const cube = (number1) => {
      return (Math.pow((parseFloat(number1)),3))
    }
    const exponential = (number1,number2) => {
      return (Math.pow((parseFloat(number1)),(parseFloat(number2))))
    }


    const resetRegisters = () => {
      setNumber1("")
      setNumber2("")
      setOperand("")
      setSpecialOperand("")
    }


    return (
      <View testID="DemoScreen" style={FULL}>
        <Screen style={CONTAINER}>
          <GradientBackground colors={["#000000", "#000000"]} />
          <Header
            headerTx="demoScreen.calculator"
            style={HEADER}
            titleStyle={HEADER_TITLE}
            leftIcon="bug"
            onLeftPress={nextScreen}
          />
          <View style={FULL}>
            <View style={DISPLAY}>
                <Text style={DISPLAY_TEXT}>
                  {display}
                </Text>
                <Text style={DISPLAY_RESULT_TEXT}>
                  {displayResult}
                </Text>
            </View>
            <View style={KEYBOARD_BACK}>
              <GradientBackground colors={["#434343", "#000000"]} />
              <View style={STYLE_VIEW1}>
                <View style={STYLE_INNER_VIEW1}>
                  <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC} buttonName={"√"}
                                 onPress={() => updateCalc("√")} />
                  <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC} buttonName={"x²"}
                                 onPress={() => updateCalc("²")} />
                  <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC} buttonName={"^"}
                                 onPress={() => updateCalc("^")} />
                </View>
                <View style={STYLE_INNER_VIEW1}>
                  <CustomButton  buttonName={"7"}
                                 onPress={() => updateCalc("7")} />
                  <CustomButton  buttonName={"8"}
                                 onPress={() => updateCalc("8")} />
                  <CustomButton  buttonName={"9"}
                                 onPress={() => updateCalc("9")} />

                </View>
                <View style={STYLE_INNER_VIEW1}>
                  <CustomButton  buttonName={"4"}
                                 onPress={() => updateCalc("4")} />
                  <CustomButton  buttonName={"5"}
                                 onPress={() => updateCalc("5")} />
                  <CustomButton  buttonName={"6"}
                                 onPress={() => updateCalc("6")} />

                </View>
                <View style={STYLE_INNER_VIEW1}>
                  <CustomButton  buttonName={"1"}
                                 onPress={() => updateCalc("1")} />
                  <CustomButton  buttonName={"2"}
                                 onPress={() => updateCalc("2")} />
                  <CustomButton  buttonName={"3"}
                                 onPress={() => updateCalc("3")} />

                </View>
                <View style={STYLE_INNER_VIEW1}>
                  <CustomButton  buttonName={"."}
                                 onPress={() => updateCalc(".")} />
                  <CustomButton  buttonName={"0"}
                                 onPress={() => updateCalc("0")} />
                  <CustomButton  buttonName={"AC"}
                                 onPress={() => updateCalc("AC")} />
                </View>
              </View>
              <View style={STYLE_VIEW2}>
                <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC} buttonName={"/"}
                               onPress={() => updateCalc("/")} />
                <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC} buttonName={"x"}
                               onPress={() => updateCalc("x")} />
                <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC} buttonName={"+"}
                              onPress={() => updateCalc("+")} />
                <CustomButton buttonStyles={STYLES_OPERAND_BUTTON_BASIC}  buttonName={"-"}
                              onPress={() => updateCalc("-")}/>
                <CustomButton buttonStyles={STYLES_EQUAL_BUTTON_BASIC} buttonName={"="}
                              onPress={() => updateCalc("=")}/>
              </View>

            </View>
          </View>
        </Screen>
      </View>
    )
  },
)
