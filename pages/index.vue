<template>
    <div class="d-md-flex justify-space-between">
        <v-card class="tt-full-width mr-md-4">
            <v-card-title>
                Rota Options
            </v-card-title>
            <v-card-text>
                <DateFilter :dates.sync="dates" />
                <UserFilter
                    v-model="selectedUsers"
                    :users="users"
                    :loading="loadingUsers"
                />
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn
                    depressed
                    color="success"
                    :loading="loadingRotas"
                    @click="getFilteredAndFormattedRotas"
                >
                    Get Rotas
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card class="tt-full-width">
            <LoadingOverlay v-model="loadingRotas" />
            <v-card-text>
                <component
                    v-if="formattedRotas.length"
                    :is="displayCalendar ? RotaCalendar : RotaAccordion"
                    :rotas="formattedRotas"
                />
                <div v-else>
                    <v-alert
                        type="info"
                        border="left"
                        prominent
                        text
                    >
                        No Rotas - Please Change Search Criteria or Press 'Get Rotas'
                    </v-alert>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import RotaAccordion from '../components/RotaAccordion.vue';
import RotaCalendar from '../components/RotaCalendar.vue';

export default {
    computed: {
        toggleLabel() {
            if (this.displayCalendar) {
                return 'View As Accordion';
            }
            return 'View As Calendar';
        }
    },

    data() {
        return {
            dates: [],
            rotas: [],
            users: [],
            selectedUsers: [],
            formattedRotas: [],
            loadingRotas: false,
            loadingUsers: false,
            displayCalendar: false,
            RotaAccordion,
            RotaCalendar,
        }
    },

    async created() {
        await Promise.all([
            this.getUsers(),
            this.getRotas(),
        ])
        this.getFilteredAndFormattedRotas();
    },

    methods: {
        changeDisplay() {
            this.displayCalendar = !this.displayCalendar;
        },
        async getRotas() {
            this.loadingRotas = true;
            try {
                const response = await this.$store.dispatch('getRotas');
                if (!response) {
                    throw new Error('No Rotas Found');
                }

                this.rotas = response;
                this.$dialog.notify.success('Fetched Rotas From Server');
            } catch (error) {
                this.$dialog.notify.error(error.message);
            }
            this.loadingRotas = false;
        },
        async getUsers() {
            this.loadingUsers = true;
            try {
                const response = await this.$store.dispatch('getUsers');
                if (!response) {
                    throw new Error('No Users Found');
                }

                this.users = response.map(user => ({
                    ...user,
                    full_name: user.first_name + ' ' + user.last_name,
                }));

                this.$dialog.notify.success('Loaded Users');
            } catch (error) {
                this.$dialog.notify.error(error.message);
            }
            this.loadingUsers = false;
        },
        getFilteredAndFormattedRotas() {
            this.$dialog.notify.info('Formatting Rotas...');

            if (!this.rotas.length) {
                this.$dialog.notify.warning('No Rotas For Criteria');
                return [];
            }

            this.loadingRotas = true;
            this.formattedRotas = this.rotas.filter(rota => {
                // filter the rotas by the selected users and dates
                let userIsSelected = true;
                let dateIsSelected = true;

                if (this.selectedUsers.length) {
                    userIsSelected = this.selectedUsers.includes(rota.userId);
                }

                if (this.dates.length) {
                    dateIsSelected = this.dates.some(date => {
                        // due to the quality of the data, the start and end dates are not always accurate 
                        // best filtering comes from just checking the 'date' field
                        return (date >= rota.startDate && date <= rota.endDate) || date === rota.date;
                    });
                }

                return userIsSelected && dateIsSelected;
            }).map(rota => {
                // format the rotas to be used by the RotaAccordion and RotaCalendar components
                const user = this.users.find(user => user.id === rota.userId);

                return {
                    ...rota,
                    user: user ? user.full_name : 'Unknown User',
                }
            }).sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            this.loadingRotas = false;
            this.$dialog.notify.success('Loaded Rotas');
        },
    }
}
</script>

<style lang="scss">
.tt-full-width {
    width: 100%;
}
.tt-full-height {
    height: 100%;
}
</style>
