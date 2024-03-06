<template>
<div class="container">
    <h1>Invite Tenant/Caretaker</h1>
    <form @submit.prevent="sendInvitation" class="form">
        <input type="email" v-model="inviteeEmail" placeholder="Invitee's Email">
        <select v-model="inviteeRole">
            <option value="tenant">Tenant</option>
            <option value="caretaker">Caretaker</option>
        </select>
        <button type="submit">Send Invitation</button>
    </form>

    <!-- Signup Link Message -->
    <div v-if="signupLink" class="signup-link" @click="copyLink">
        <p>Send this signup link to the invitee:</p>
        <p>{{ signupLink }}</p>   
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast">
        <div class="toast-progress" :style="{ width: toastProgress + '%' }"></div>
        <p>{{ toastMessage }}</p>
    </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
    setup() {
        const inviteeEmail = ref('');
        const inviteeRole = ref('');
        const signupLink = ref('');
        const showToast = ref(false);
        const toastProgress = ref(100);
        const toastMessage = ref('');

        const sendInvitation = async () => {
            const docRef = await addDoc(collection(db, 'invitations'), {
                email: inviteeEmail.value,
                role: inviteeRole.value,
            });

            signupLink.value = `${window.location.origin}/invitee-register?id=${docRef.id}`;
            showToast.value = true;
            toastMessage.value = 'Invitation link sent!';
            let intervalId = setInterval(() => {
                toastProgress.value -= 1;
                if (toastProgress.value <= 0) {
                    clearInterval(intervalId);
                    showToast.value = false;
                    toastProgress.value = 100;
                }
            }, 30);
        };

        const copyLink = () => {
            navigator.clipboard.writeText(signupLink.value);
            showToast.value = true;
            toastMessage.value = 'Link copied!';
            let intervalId = setInterval(() => {
                toastProgress.value -= 1;
                if (toastProgress.value <= 0) {
                    clearInterval(intervalId);
                    showToast.value = false;
                    toastProgress.value = 100;
                }
            }, 30);
        };

        console.log('InviteForm component mounted');

        return {
            inviteeEmail,
            inviteeRole,
            sendInvitation,
            signupLink,
            showToast,
            toastProgress,
            copyLink,
            toastMessage,
        };
    },
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ff9966, #ff5e62);
  font-family: Arial, sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  gap: 20px;
}

.form input,
.form select,
.form button {
  height: 40px;
}

.signup-link {
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.toast {
  position: fixed;
  bottom: 1em;
  right: 1em;
  width: 200px;
  padding: 1em;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  transition: opacity 0.3s ease;
}

.toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.5);
}
</style>
