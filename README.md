# ADDRESS BOOK

## Setup

### Prerequisites

Follow the *React Native CLI Quickstart* prerequisite instructions located [here](https://facebook.github.io/react-native/docs/getting-started). You will need Node, TypeScript, Watchman, React Native command line interface, Xcode, JDK 8, Android Studio and the Android SDK. 

### Environment Variables

Create a file named `.env` and add your Google Maps API key.

```
GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

### Running the App

Use the following commands to start up the app on your emulator or device:

```
npm install
```

**Android**

```
react-native run-android
```

**iOS**

```
react-native run-ios
```

### Live Reload

On Android, shake the device forward and backward a couple of times to display the menu. Tap **Reload**.

> NOTE: When changing platform specific properties, you will still need to restart the local server.

## VS Code Configuration

If you're using VS Code, add the following to your workspace settings to remove TypeScript warnings.

```
{
    "javascript.validate.enable": false
}
```

## Resources

### React Navigation

https://reactnavigation.org/docs/en/getting-started.html#installation

### React Native Config

This library is used to hide environment variables like the Google Maps API key. 

https://github.com/luggit/react-native-config