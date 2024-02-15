<template>
<div class="container">
    <h1>Landlord Dashboard</h1>

    <!-- Invitation Form -->
    <h2>Invite Tenant/Caretaker</h2>
    <form @submit.prevent="sendInvitation" class="form">
        <input type="email" v-model="inviteeEmail" placeholder="Invitee's Email">
        <select v-model="inviteeRole">
            <option value="tenant">Tenant</option>
            <option value="caretaker">Caretaker</option>
        </select>
        <button type="submit">Send Invitation</button>
    </form>

    <!-- Signup Link Message -->
    <div v-if="signupLink" class="signup-link">
        <p>Send this signup link to the invitee:</p>
        <p>{{ signupLink }}</p>   
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast">
        <p>Invitation link sent!</p>
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
        const signupLink = ref(''); // new ref for signup link
        const showToast = ref(false); // new ref for showing toast notif

        const sendInvitation = async () => {
            const docRef = await addDoc(collection(db, 'invitations'), {
                email: inviteeEmail.value,
                role: inviteeRole.value,
            });

            // send email to invitee with signup link that includes docRef.id
            signupLink.value = `${window.location.origin}/invitee-register?id=${docRef.id}`;

            // show toast notif
            showToast.value = true;
            setTimeout(() => {
                showToast.value = false;
            }, 3000);
        };

        return {
            inviteeEmail,
            inviteeRole,
            sendInvitation,
            signupLink,
            showToast,
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
}

.signup-link {
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.toast {
  position: fixed;
  bottom: 1em;
  right: 1em;
  padding: 1em;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  transition: opacity 0.3s ease;
}
</style>