import { firebaseAuth } from './firebase';

export const signOut = async () => await firebaseAuth.signOut();
