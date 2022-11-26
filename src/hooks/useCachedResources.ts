import { useDispatch } from 'react-redux';
import { ILayout } from './../Interface/Layout';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';
import { updateLayout } from '../store/features/layoutSlice';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useDispatch();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        ScreenOrientation.addOrientationChangeListener((evt) => {
          const data: ILayout = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            isLandscape:
              Dimensions.get('window').width >
                Dimensions.get('window').height ||
              Dimensions.get('window').width > 768
                ? 2
                : 1,
          };
          dispatch(updateLayout(data));
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  return isLoadingComplete;
}
