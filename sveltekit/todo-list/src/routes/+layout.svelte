<script>
  import { onMount } from 'svelte';
  import { auth, db } from '../lib/firebase/firebase';
  import { getDoc, doc, setDoc } from 'firebase/firestore';
  import { authStore } from '../store/store';

  const nonAuthRoutes = ['/', '/product'];

  onMount(() => {
    console.log('Mounting');
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = '/';
        return;
      }

      if (user && currentPath === '/') {
        window.location.href = '/dashboard';
        return;
      }

      if (!user) {
        return;
      }
      let dataToSetToStore;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log('Creating User');
        const userRef = doc(db, 'users', user.uid);
        dataToSetToStore = {
          email: user.email,
          todos: [],
        };
        await setDoc(userRef, dataToSetToStore, { merge: true });
      } else {
        const userData = docSnap.data();
        dataToSetToStore = userData;
      }
      authStore.update((curr) => {
        return {
          ...curr,
          user,
          data: dataToSetToStore,
          loading: false,
        };
      });
    });
  });
</script>

<div class="mainContainer">
  <slot />
</div>

<style>
  .mainContainer {
    min-height: 100vh;
    background: linear-gradient(to right, #000428, #000046);
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }
</style>
