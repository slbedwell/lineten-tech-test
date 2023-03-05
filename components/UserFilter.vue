<template>
    <v-autocomplete
        :value="value"
        :items="users"
        :loading="loading"
        item-value="id"
        item-text="full_name"
        label="Users"
        multiple
        chips
        small-chips
        deletable-chips
        hide-details
        @input="$emit('input', $event)"
    />
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
        users: {
            type: Array,
            default() {
                return [];
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
</style>