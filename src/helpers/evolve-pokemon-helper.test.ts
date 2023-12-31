import { CreatureEntity } from "../entities/creature-entity";
import { EvolutionEntity } from "../entities/evolution-entity";
import { evolvePokemonHelper } from "./evolve-pokemon-helper";

const mockedGetRepository = jest.requireMock("typeorm").getRepository;
const mockCreatureRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};
const mockEvolutionRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockOrm = {
  getRepository: jest.fn(),
};

mockOrm.getRepository.mockImplementation((entity) => {
  switch (entity) {
    case CreatureEntity:
      return mockCreatureRepository;
    case EvolutionEntity:
      return mockEvolutionRepository;
    default:
      throw new Error("Unknown repository");
  }
});

beforeEach(() => {
  jest.clearAllMocks();
  mockedGetRepository
    .mockReturnValueOnce(mockCreatureRepository)
    .mockReturnValueOnce(mockEvolutionRepository);
});

it("should create an evolution when it does not exist", async () => {
  const baseCreature = {
    name: "Bulbasaur",
    evolutions: [],
  };
  const evolvedCreature = {
    name: "Ivysaur",
  };

  mockCreatureRepository.findOne
    .mockResolvedValueOnce(baseCreature)
    .mockResolvedValueOnce(evolvedCreature);

  await evolvePokemonHelper(mockOrm, "Bulbasaur", "Ivysaur");

  expect(mockCreatureRepository.save).toHaveBeenCalledWith(
    expect.objectContaining({
      evolutions: expect.arrayContaining([
        expect.objectContaining({ name: "Ivysaur" }),
      ]),
    })
  );
  expect(mockEvolutionRepository.save).toHaveBeenCalledWith(
    expect.objectContaining({ name: "Ivysaur" })
  );
});
