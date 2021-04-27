import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

import { config } from '../config/firebase-config';

const fire = firebase.initializeApp(config);

export const auth = fire.auth();
export const firestore = fire.firestore();
export const functions = fire.functions();
