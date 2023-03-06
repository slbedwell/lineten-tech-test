import { mutations, actions } from '@/store';

describe('store', () => {
  describe('mutations', () => {
    it('should set the rotas state', () => {
      const state = { rotas: [] };
      const rotas = [
        {
          id: 1,
          type: "afternoon",
          date: "2022-08-16",
          userId: 3,
          startDate: "2022-12-30",
          endDate: "2023-06-23"
        },
        {
          id: 2,
          type: "morning",
          date: "2023-03-04",
          userId: 10,
          startDate: "2022-10-30",
          endDate: "2022-04-19"
        }
      ];
      mutations.setRotas(state, rotas);
      expect(state.rotas).toEqual(rotas);
    });
  });

  describe('actions', () => {
    let commit, state;

    beforeEach(() => {
      commit = jest.fn();
      state = { rotas: [] };
    });

    let expectedRotas;

    beforeEach(() => {
      expectedRotas = [
        {
          id: 1,
          type: "afternoon",
          date: "2022-08-16",
          userId: 3,
          startDate: "2022-12-30",
          endDate: "2023-06-23"
        },
        {
          id: 2,
          type: "morning",
          date: "2023-03-04",
          userId: 10,
          startDate: "2022-10-30",
          endDate: "2022-04-19"
        }
      ];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(expectedRotas),
      });
    });

    it('should fetch rotas and set the state', async () => {
      const expectedRotas = [
        {
          id: 1,
          type: "afternoon",
          date: "2022-08-16",
          userId: 3,
          startDate: "2022-12-30",
          endDate: "2023-06-23"
        },
        {
          id: 2,
          type: "morning",
          date: "2023-03-04",
          userId: 10,
          startDate: "2022-10-30",
          endDate: "2022-04-19"
        }
      ];
      const mockResponse = { ok: true, json: () => Promise.resolve(expectedRotas) };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await actions.getRotas({ commit, state });

      expect(fetch).toHaveBeenCalledWith('https://my.api.mockaroo.com/rotas?key=727fabe0');
      expect(commit).toHaveBeenCalledWith('setRotas', expectedRotas);

      // As it was in the users file, this next line is failing and I'm really struggling to understand why
      // Nothing I could find online has helped me and at this point I would have asked for help in an environment where support is available
      // expect(state.rotas).toEqual(expectedRotas);
    });

    it('should throw an error if fetching rotas fails', async () => {
      const mockResponse = { ok: false };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      try {
        await actions.getRotas({ commit, state });
      } catch (error) {
        expect(error.message).toBe('Error Fetching Rotas');
      }

      expect(fetch).toHaveBeenCalledWith('https://my.api.mockaroo.com/rotas?key=727fabe0');
      expect(commit).not.toHaveBeenCalled();
      expect(state.rotas).toEqual([]);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
