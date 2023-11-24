import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'My App needs access to your location',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}
export default requestLocationPermission