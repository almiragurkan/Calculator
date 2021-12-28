import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { CustomButton } from "../custom-button/custom-button"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flexDirection:"row"
}

export interface CreateFeaturesProps {
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
export const CreateFeatures = observer(function CreateFeatures(props: CreateFeaturesProps) {
  const { containerStyle } = props
  /* const styles = flatten([CONTAINER, style,BUTTON]) */
  const cStyle = flatten ([CONTAINER,containerStyle])

  return (
    <View style={cStyle}>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"AC"} />
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"C"}/>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"+/-"}/>
      <CustomButton buttonStyles={props.buttonStyle} buttonTextStyles={props.buttonTextStyle} buttonName={"%"} onPress={() => calculate('%')}/>
    </View>
  )
})
