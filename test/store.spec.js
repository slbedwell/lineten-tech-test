import { state, mutations, actions } from '@/store';

describe('store', () => {
    describe('state', () => {
        it('should have an empty array for users and rotas', () => {
            const expectedState = {
                users: [],
                rotas: [],
            };
            expect(state()).toEqual(expectedState);
        });
    });
});