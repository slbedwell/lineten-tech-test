<template>
    <div>
        <v-toolbar
            v-if="$refs.rotaCalendar"
            flat
            rounded
            class="d-flex justify-space-betwee "
        >
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        depressed
                        @click="previousMonth"
                    >
                        <v-icon left>mdi-chevron-left</v-icon>
                        Previous
                    </v-btn>
                </template>
                View Previous Month
            </v-tooltip>

            <v-toolbar-title class="mx-4">
                {{ $refs.rotaCalendar.title }}
            </v-toolbar-title>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        depressed
                        @click="nextMonth"
                    >
                        <v-icon left>mdi-chevron-right</v-icon>
                        Next
                    </v-btn>
                </template>
                View Next Month
            </v-tooltip>
        </v-toolbar>

        <v-calendar
            ref="rotaCalendar"
            v-model="value"
            type="month"
            event-name="user"
            event-start="startDate"
            event-end="endDate"
            :events="rotas"
            :event-color="getEventColor"
        />
    </div>
</template>

<script>
export default {
    props: {
        rotas: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            value: undefined
        }
    },

    methods: {
        getEventColor(event) {
            switch (event.type) {
                case 'morning':
                    return 'primary';
                case 'afternoon':
                    return 'secondary';
            }
            return 'grey';
        },
        nextMonth() {
            this.$refs.rotaCalendar.next();
        },
        previousMonth() {
            this.$refs.rotaCalendar.prev();
        },
    },
}
</script>

<style lang="scss" scoped>
</style>