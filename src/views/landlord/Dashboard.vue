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