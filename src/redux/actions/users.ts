import { auth, firestore } from '../../firebase/firebase';
import { IUser, UserActionTypes } from '../../types/user';

export const setUser = (user: IUser) => ({
  type: UserActionTypes.SET_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const fetchUser = (email: string, password: string, hasAccount: boolean, name: string) => (
  dispatch: any,
) => {
  if (hasAccount) {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      if (err) {
        return dispatch(
          setUser({
            userName: '',
            userId: '',
            errorMessage: err.message,
          }),
        );
      }
    });
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore
          .collection('users')
          .where('userId', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              dispatch(
                setUser({
                  userName: doc.data().userName,
                  userId: user.uid,
                  errorMessage: '',
                }),
              );
            });
          });
      }
    });
  } else {
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      if (err.message) {
        return dispatch(
          setUser({
            userName: '',
            userId: '',
            errorMessage: err.message,
          }),
        );
      }
    });

    auth.onAuthStateChanged((user) => {
      console.log(user?.uid, name);
      if (user) {
        dispatch(
          setUser({
            userName: name,
            userId: user.uid,
            errorMessage: '',
          }),
        );

        firestore.collection('users').add({
          userId: user.uid,
          userName: name,
        });
      }
    });
  }
};

export const logout = () => (dispatch: any) => {
  auth.signOut();
  dispatch(logoutUser());
};
