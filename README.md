# WiFi and Hotspot-based Attendance System

## Working

1. Our main idea is to utilize the user's WiFi to detect if the user is present in the range of the attendance taker's device (within the range of hotspot).

2. This application has two options:

   - Option 1: I am a teacher (attendance taker).
   - Option 2: I am a student (one who wants their presence to be counted).

### Option 1: I am a teacher

   1. This option enables the hotspot of the teacher's phone when the teacher wants to start taking attendance.

   2. Then a WebSocket server starts listening for incoming attendance requests from students' devices.

   3. The request contains the details of the student along with a unique token for authenticity of the user.

   4. Now the WebSocket server checks if the request is legit and sends a signal back to the user that their attendance has been marked.

### Option 2: I am a student

   1. Students just need to click on the button "Mark my Attendance".

   2. This option enables the WiFi of the student's phone when the student wants to mark their presence.

   3. Then the device connects to the teacher's hotspot with the particular SSID and password fetched from the server (in our case, it is hardcoded for now).

   4. Then the student connects to the WebSocket server listening from the teacher's device and sends a request to it.

   5. The request contains the details of the student along with a unique token for authenticity of the user.

   6. Now the WebSocket server checks if the request is legit and sends a signal back to the user that their attendance has been marked.

   7. Upon successful marking of attendance, the user turns off its WiFi and also displays a message that the attendance is marked.

## How to Run Our App Locally?

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your our attendance app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

### Congratulations! :tada:

You've successfully run our React Native App. :partying_face:
