import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { CustomButton } from "../custom-button/custom-button"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
  flex:1
}

export interface CreateOthersProps {
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
export const CreateOthers = observer(function CreateOthers(props: CreateOthersProps) {
  const { containerStyle } = props
  const cStyle = flatten ([CONTAINER,containerStyle])

  return (
    <View style={cStyle}>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"0"}/>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={","}/>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"="}/>
    </View>
  )
})
