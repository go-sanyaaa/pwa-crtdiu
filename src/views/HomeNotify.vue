<template lang="pug">
    v-container
        div
            v-btn(v-if="notificationsSupported" @click="askPermission") Включить уведомления
</template>

<script>
    export default {
        name: 'HomeNotify',
        data(){
            return {
                notificationsSupported: false,
                serviceWorkerRegistation: null,
            }
        },
        methods: {
            askPermission() {
                if (this.notificationsSupported) {
                    Notification.requestPermission()
                        .then(result => {
                            if(result === "granted"){
                                this.createSubscription()
                                    .then(sub => {
                                        console.log('subscription created on the client', sub);
                                    })
                                    .catch(e =>{
                                        console.log(e)
                                    })
                            }
                        })
                }
            },
            createSubscription() {
                console.log('ask for active service worker registration');
                if (this.serviceWorkerRegistation === null) {
                    return navigator.serviceWorker.ready // returns a Promise, the active SW registration
                        .then(swreg => {
                            this.serviceWorkerRegistation = swreg
                            console.log(swreg)
                            return this.subscribe(this.serviceWorkerRegistation)
                        })
                } else {
                    return this.subscribe(this.serviceWorkerRegistation)
                }
            },
            subscribe(swreg) {
                console.log('create new subscription for this browser on this device');
                // create new subscription for this browser on this device
                // return the subscription promise, we chain another then where we can send it to the server
                return swreg.pushManager.subscribe({
                    userVisibleOnly: true,
                })
            },
            showNotification() {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready // returns a Promise, the active SW registration
                        .then(swreg => {
                            swreg.showNotification('Notifications granted', {
                                body: 'Here is a first notification',
                                icon: '/img/icons/android-chrome-192x192.png',
                                image: '/img/autumn-forest.png',
                                vibrate: [300, 200, 300],
                                badge: '/img/icons/plint-badge-96x96.png',
                                // actions: [
                                //     { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
                                //     { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
                                // ],
                            })
                        })
                }
            },
        },
        created() {
            if ('Notification' in window && 'serviceWorker' in navigator) {
                this.notificationsSupported = true
            }
        },
    }
</script>