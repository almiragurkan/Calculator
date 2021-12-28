import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { CustomButton } from "../custom-button/custom-button"

const CONTAINER: ViewStyle = {
  flexWrap:"wrap",
  justifyContent: "center",
  flexDirection: "row",
  flex:1
}

const BUTTON: ViewStyle = {
  flex: undefined,
  width:'33.33%',
  height:'25%'
}

export interface CreateDigitsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  number1: string
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  buttonTextStyle?: StyleProp<TextStyle>
}

/**
 * Describe your component here
 */
export const CreateDigits = observer(function CreateDigits(props: CreateDigitsProps) {
  const { containerStyle, buttonStyle  } = props
  const cStyle = flatten ([CONTAINER,containerStyle])
  const bStyle = flatten ([BUTTON, buttonStyle])


  const digits = [];
    for(let i=1;i<10;i++){
      digits.push(
        <CustomButton buttonStyles={bStyle} buttonTextStyles={props.buttonTextStyle}
                      onPress={() => updateCalc(i.toString())}
                      key={"btn_" + i.toString()} buttonName={i.toString()}/>
      )
    }

  return (
    <View style={cStyle}>
      {digits}
      <CustomButton buttonStyles={BUTTON} buttonTextStyles={props.buttonTextStyle} buttonName={"0"} onPress={() => calculate('0')}/>
      <CustomButton buttonStyles={BUTTON} buttonTextStyles={props.buttonTextStyle} buttonName={","} onPress={() => calculate(',')}/>
      <CustomButton buttonStyles={BUTTON} buttonTextStyles={props.buttonTextStyle} buttonName={"="}/>
    </View>
  )
})
