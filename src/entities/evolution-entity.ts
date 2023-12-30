import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { CreatureEntity } from "./creature-entity";

@Entity({
  name: "evolution",
})
export class EvolutionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CreatureEntity, (creature) => creature.evolutions)
  creature: CreatureEntity;
}
