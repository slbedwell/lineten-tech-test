<template>
    <v-app>
        <v-app-bar
            fixed
            app
        >
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            title: 'LineTen Technical Test'
        }
    }
}
</script>
