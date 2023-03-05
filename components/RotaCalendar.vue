<template>
    <div>
        <v-calendar
            ref="calendar"
            type="month"
            event-name="user"
            event-start="startDate"
            event-end="endDate"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            :events="rotas"
            :event-color="getEventColor"
        />
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },
        rotas: {
            type: Array,
            default() {
                return [];
            },
        },
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
    },
}
</script>

<style lang="scss" scoped>
</style>