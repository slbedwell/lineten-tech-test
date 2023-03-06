export const state = () => ({
    users: [],
    rotas: [],
});

export const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    setRotas(state, rotas) {
        state.rotas = rotas;
    },
};

export const actions = {
    async getUsers({ commit, state }) {
        if (!state.users.length) {
            const params = new URLSearchParams({
                key: '727fabe0',
            });

            const response = await fetch(`https://my.api.mockaroo.com/users?${params}`)

            if (!response.ok) {
                throw new Error('Error Fetching Users');
            }

            const users = await response.json();
            commit('setUsers', users);
        }

        return state.users;
    },
    async getRotas({ commit, state }) {
        if (!state.rotas.length) {
            const params = new URLSearchParams({
                key: '727fabe0',
            });

            const response = await fetch(`https://my.api.mockaroo.com/rotas?${params}`)

            if (!response.ok) {
                throw new Error('Error Fetching Rotas');
            }

            const rotas = await response.json();
            commit('setRotas', rotas);
        }

        return state.rotas;
    }
};
