import * as React from "react"
import { GestureResponderEvent, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { flatten } from "ramda"

/* const CONTAINER: ViewStyle = {
  justifyContent: "center",
} */
const BUTTON: ViewStyle = {
  flex:1,
  backgroundColor: 'rgba(93,92,92,0.17)',
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 10,
  flexDirection: "row",
  alignItems:'center',
  margin:7
}

const BUTTON_TEXT: TextStyle = {
  flex:1,
  color: 'white',
  fontSize: 30,
  textAlign: 'center',
  alignItems:'center',
}

export interface CustomButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
  buttonName?: string
  buttonStyles?: StyleProp<ViewStyle>
  buttonTextStyles?: StyleProp<TextStyle>
}

/**
 * Describe your component here
 */
export const CustomButton = observer(function CustomButton(props: CustomButtonProps) {
  const { buttonName, buttonStyles, buttonTextStyles } = props
  const buttonStyle = flatten([BUTTON, buttonStyles])
  const buttonTextStyle = flatten([BUTTON_TEXT,buttonTextStyles])

  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text style={buttonTextStyle}>
        {buttonName}
      </Text>
    </TouchableOpacity>
  )
})
