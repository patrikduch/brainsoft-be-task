jest.mock("typeorm", () => ({
  getRepository: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  PrimaryColumn: jest.fn(),
  Entity: jest.fn(),
  Column: jest.fn(),
  ManyToOne: jest.fn(),
  OneToMany: jest.fn(),
  ManyToMany: jest.fn(),
  JoinTable: jest.fn(),
  JoinColumn: jest.fn(),
}));
