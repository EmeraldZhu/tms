<template>
<div>
    <h1>Landlord Dashboard</h1>

    <!-- Invitation Form -->
    <h2>Invite Tenant/Caretaker</h2>
    <form @submit.prevent="sendInvitation">
        <input type="email" v-model="inviteeEmail" placeholder="Invitee's Email">
        <select v-model="inviteeRole">
            <option value="tenant">Tenant</option>
            <option value="caretaker">Caretaker</option>
        </select>
        <button type="submit">Send Invitation</button>
    </form>
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

        const sendInvitation = async () => {
            const docRef = await addDoc(collection(db, 'invitations'), {
                email: inviteeEmail.value,
                role: inviteeRole.value,
            });

            // send email to invitee with signup link that includes docRef.id
        };

        return {
            inviteeEmail,
            inviteeRole,
            sendInvitation,
        };
    },
};
</script>