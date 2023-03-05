<template>
    <v-expansion-panels>
        <v-expansion-panel
            v-for="rota in rotas"
            :key="rota.id"
        >
            <v-expansion-panel-header>
                {{ rota.user }}: {{ rota.date }} ({{ rota.type }})
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                ID: {{ rota.id }} <br />
                User ID: {{ rota.userId }} <br />
                User Name: {{ rota.user }} <br />
                Start Date: {{ rota.startDate }} <br />
                End Date: {{ rota.endDate }} <br />
                Type: {{ rota.type }} <br />
                Date: {{ rota.date }}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    props: {
        rotas: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss" scoped>
</style>