import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Books from '../screens/Books/container';
import Favorites from '../screens/Favorites/container';
import Book from '../screens/Book/container';
import Quotes from '../screens/Quotes/container';
import Quote from '../screens/Quote/container';
import SelectBook from '../screens/SelectBook';
import Login from '../screens/Login/container';
import Register from '../screens/Register/container';
import Account from '../screens/Account/container';
import Initial from '../screens/Initial/container';
import ChangePassword from '../screens/ChangePassword/container';
import ChangeEmail from '../screens/ChangeEmail/container';

import {AuthContext} from '../context/auth';

import TabIcon from '../components/tab-icon';
import IconButton from '../components/icon-button';

import {tabIcons, icons} from '../assets';
import {colors} from '../themes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const InitialStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Initial"
        component={Initial}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerTintColor: colors.primary}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerTintColor: colors.primary}}
      />
    </Stack.Navigator>
  );
};

const BooksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Books"
        component={Books}
        options={({navigation}) => {
          return {
            headerTintColor: colors.primary,
            headerRight: () => {
              return (
                <IconButton
                  onPress={() => navigation.navigate('Book')}
                  source={icons.plus}
                />
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{headerTintColor: colors.primary}}
      />
      <Stack.Screen
        name="Quotes"
        component={Quotes}
        options={{headerTintColor: colors.primary}}
      />
      <Stack.Screen
        name="Quote"
        component={Quote}
        options={{headerTintColor: colors.primary}}
      />
    </Stack.Navigator>
  );
};

const QuotesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Quotes"
        component={Quotes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Quote"
        component={Quote}
        options={{headerTintColor: colors.primary}}
      />
      <Stack.Screen
        name="SelectBook"
        component={SelectBook}
        options={{title: 'Select Book', headerTintColor: colors.primary}}
      />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Account"
            component={Account}
            options={{headerTintColor: colors.primary}}
          />
          <Stack.Screen
            name="ChangeEmail"
            component={ChangeEmail}
            options={{title: 'Change Email', headerTintColor: colors.primary}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              title: 'Change Password',
              headerTintColor: colors.primary,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerTintColor: colors.primary}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerTintColor: colors.primary}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const {initialized} = useContext(AuthContext);

  if (!initialized) {
    return (
      <NavigationContainer>
        <InitialStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.gray,
        }}>
        <Tab.Screen
          name="Books"
          component={BooksStack}
          options={{
            tabBarLabel: 'Books',
            tabBarIcon: ({focused}) => (
              <TabIcon active={focused} source={tabIcons.books} />
            ),
          }}
        />

        <Tab.Screen
          name="Quotes"
          component={QuotesStack}
          options={{
            tabBarLabel: 'Quotes',
            tabBarIcon: ({focused}) => (
              <TabIcon active={focused} source={tabIcons.quotes} />
            ),
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({focused}) => (
              <TabIcon active={focused} source={tabIcons.favorites} />
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarLabel: 'My Account',
            tabBarIcon: ({focused}) => (
              <TabIcon active={focused} source={tabIcons.account} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
