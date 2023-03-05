<template>
    <v-overlay
        v-model="value"
        :absolute="!fullPage"
        color="white"
        opacity="0.75"
    >
        <v-progress-circular
            indeterminate
            color="secondary"
            size="50"
        />
    </v-overlay>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        fullPage: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
