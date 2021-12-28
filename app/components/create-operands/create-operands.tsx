import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { CustomButton } from "../custom-button/custom-button"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface CreateOperandsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  buttonTextStyle?: StyleProp<TextStyle>
}

/**
 * Describe your component here
 */
export const CreateOperands = observer(function CreateOperands(props: CreateOperandsProps) {
  const { containerStyle } = props
  const cStyle = flatten ([CONTAINER,containerStyle])

  return (
    <View style={cStyle}>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"+"} />
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"-"} />
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"/"} />
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"*"} />
    </View>
  )
})
