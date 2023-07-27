import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase';

export const authStore = writable({
  user: null,
  loading: true,
  data: {},
});

export const authHandlers = {
  signup: async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  },
  login: async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
  },
  logout: async () => {
    await signOut(auth);
  },
};
