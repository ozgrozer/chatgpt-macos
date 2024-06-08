# chatgpt-macos

A React Native MacOS demo for ChatGPT client

## Preview

<img src="./preview/preview.png" alt="" width="600" />

## Usage

Install dependencies and initialize macos.

```
yarn install
npx react-native-macos-init
```

Start development.

```
# first terminal tab
yarn start
# second terminal tav
yarn macos
```

Build the app.

```
open macos/ChatGPTMacOS.xcworkspace
# select your project name near top left
# product/scheme/edit scheme
# save run/build configuration: release
# product/build
# right-click on the .app file in the products group in the left sidebar, and select show in finder
```
