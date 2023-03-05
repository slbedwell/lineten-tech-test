<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
        @update:return-value="$emit('update:dates', $event)"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            :value="dates"
            multiple
            chips
            small-chips
            :label="label"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
            @input="$emit('update:dates', $event)"
          >
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              label
              small
            >
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon
                small
                @click="parent.selectItem(item)"
              >
                $delete
              </v-icon>
            </v-chip>
          </template>
        </v-combobox>
        </template>
        <v-date-picker
          :value="dates"
          multiple
          no-title
          scrollable
          @input="$emit('update:dates', $event)"
        >
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
</template>

<script>
export default {
  props: {
    dates: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: 'Dates',
    },
  },

  data() {
      return {
          menu: false,
      }
  },
}
</script>

<style lang="scss" scoped>

</style>