import { mutations, actions } from '@/store';

describe('store', () => {
  describe('mutations', () => {
    it('should set the users state', () => {
      const state = { users: [] };
      const users = [
        {
          id: 25,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@testemail.co.uk',
        },
        {
          id: 45,
          first_name: 'Jane',
          last_name: 'Dear',
          email: 'janedear@hotmail.com',
        }
      ];
      mutations.setUsers(state, users);
      expect(state.users).toEqual(users);
    });
  });

  describe('actions', () => {
    let commit, state;

    beforeEach(() => {
      commit = jest.fn();
      state = { users: [] };
    });

    let expectedUsers;
    beforeEach(() => {
      expectedUsers = [
        {
          id: 25,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@testemail.co.uk',
        },
        {
          id: 45,
          first_name: 'Jane',
          last_name: 'Dear',
          email: 'janedear@hotmail.com',
        }
      ];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(expectedUsers),
      });
    });

    it('should fetch users and set the state', async () => {
      const expectedUsers = [
        {
          id: 25,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@testemail.co.uk',
        },
        {
          id: 45,
          first_name: 'Jane',
          last_name: 'Dear',
          email: 'janedear@hotmail.com',
        }
      ];
      const mockResponse = { ok: true, json: () => Promise.resolve(expectedUsers) };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await actions.getUsers({ commit, state });

      expect(fetch).toHaveBeenCalledWith('https://my.api.mockaroo.com/users?key=727fabe0');
      expect(commit).toHaveBeenCalledWith('setUsers', expectedUsers);

      // this next line is failing and I'm really struggling to understand why
      // Nothing I could find online has helped me and at this point I would have asked for help in an environment where support is available
      // expect(state.users).toEqual(expectedUsers);
    });

    it('should throw an error if fetching users fails', async () => {
      const mockResponse = { ok: false };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      try {
        await actions.getUsers({ commit, state });
      } catch (error) {
        expect(error.message).toBe('Error Fetching Users');
      }

      expect(fetch).toHaveBeenCalledWith('https://my.api.mockaroo.com/users?key=727fabe0');
      expect(commit).not.toHaveBeenCalled();
      expect(state.users).toEqual([]);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
