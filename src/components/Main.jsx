import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import theme from '../theme';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryList/RepositoryItem';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReview from './UserReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/repositories/:id" element={<RepositoryItem />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/new_review" element={<ReviewForm />} />
        <Route path="/my_reviews" element={<UserReview />} />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </View>
  );
};

export default Main;
