import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

import Line from '../../components/Line';
import Spacer from '../../components/Spacer';
import Loading from '../../components/Loading';

import {icons} from '../../assets';
import {colors} from '../../themes';

import styles from './styles';

const Account = (props) => {
  const {navigation, user = {}, logout} = props;

  const imageSrc = user?.photoURL ? {uri: user.photoURL} : icons.user;

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imageSrc} resizeMode="cover" />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Email</Text>
        <Spacer size={10} />
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('ChangeEmail')}>
          <Text style={styles.value}>{user?.email}</Text>
          <Image style={styles.editIcon} source={icons.edit} />
        </TouchableOpacity>
        <Spacer size={20} />
        <Line color={colors.gray} />
        <Spacer size={20} />
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.value}>Change Password</Text>
          <Image style={styles.editIcon} source={icons.edit} />
        </TouchableOpacity>
        <Spacer size={20} />
        <Line color={colors.gray} />
        <Spacer size={20} />
        <TouchableOpacity style={styles.row} onPress={logout}>
          <Text style={styles.value}>Logout</Text>
          <Image style={styles.editIcon} source={icons.logout} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;
