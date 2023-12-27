import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { CreatureEntity } from "./creature-entity";

@Entity({
  name: "weakness",
})
export class WeaknessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => CreatureEntity, (creature) => creature.weaknesses)
  creatures: CreatureEntity[];
}
