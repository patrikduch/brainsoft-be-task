import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { CreatureTypeEntity } from "./creature-type-entity";
import { ResistanceEntity } from "./resistence-entity";
import { WeaknessEntity } from "./weakness-entity";
import { AttackEntity } from "./attack-entity";
import { EvolutionEntity } from "./evolution-entity";

@Entity({
  name: "creature",
})
export class CreatureEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column("float")
  weight_minimum: number;

  @Column("float")
  weight_maximum: number;

  @Column("float")
  height_minimum: number;

  @Column("float")
  height_maximum: number;

  @Column("float")
  fleeRate: number;

  @Column()
  maxCP: number;

  @Column()
  maxHP: number;

  @ManyToMany(() => CreatureTypeEntity, (type) => type.creatures)
  @JoinTable({
    name: "creature_types",
  })
  types: CreatureTypeEntity[];

  @ManyToMany(() => ResistanceEntity, (resistance) => resistance.creatures)
  @JoinTable({
    name: "creature_resistance",
  })
  resistances: ResistanceEntity[];

  @ManyToMany(() => WeaknessEntity, (weakness) => weakness.creatures)
  @JoinTable({
    name: "creature_weakness",
  })
  weaknesses: WeaknessEntity[];

  @ManyToMany(() => AttackEntity, (attack) => attack.creatures)
  @JoinTable({
    name: "creature_attacks",
  })
  attacks: AttackEntity[];

  @OneToMany(() => EvolutionEntity, (evolution) => evolution.creature)
  evolutions: EvolutionEntity[];

  @Column({ default: false })
  isFavorite: boolean;
}
