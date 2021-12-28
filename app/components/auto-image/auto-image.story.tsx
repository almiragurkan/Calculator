/* eslint-disable */
import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AutoImage } from "./auto-image"

declare let module

const bowser = require("../../screens/welcome/bowser.png")
const logo = { uri: "https://upvibe.net/img/logo2.png" }

storiesOf("AutoImage", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="With require()">
        <AutoImage source={bowser} />
        <AutoImage source={bowser} style={{ width: 150 }} />
        <AutoImage source={bowser} style={{ width: 150, height: 150 }} />
        <AutoImage source={bowser} style={{ height: 150 }} />
        <AutoImage source={bowser} style={{ height: 150, resizeMode: "contain" }} />
      </UseCase>
      <UseCase text="With URL">
        <AutoImage source={logo} />
        <AutoImage source={logo} style={{ width: 150 }} />
        <AutoImage source={logo} style={{ width: 150, height: 150 }} />
        <AutoImage source={logo} style={{ height: 150 }} />
        <AutoImage source={logo} style={{ height: 150, resizeMode: "contain" }} />
      </UseCase>
    </Story>
  ))
