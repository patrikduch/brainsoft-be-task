import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { CreatureEntity } from "./creature-entity";

@Entity({
  name: "evolution",
})
export class EvolutionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => CreatureEntity, (creature) => creature.evolutions)
  creature: CreatureEntity;
}
