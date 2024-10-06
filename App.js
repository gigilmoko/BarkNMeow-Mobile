// import 'react-native-gesture-handler';
import Main from "./Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';



const stripeKey =
  "pk_test_51OyxJ32LKBKaPHzvYSwVDnVrfoB5MmhIhPzm7RrKnyEwQFjd7C3fJa6MR4UF3eCtfleKLiEMzw4zOuab9SLvmLLZ00I4y76pnb";

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    const init = async () => {
      // Wait for any necessary loading tasks, then hide the splash screen
      await SplashScreen.hideAsync();
    };

    init();
  }, []);
  
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="6-pack-ecom.com"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}