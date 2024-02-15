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