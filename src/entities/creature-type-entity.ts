import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { CreatureEntity } from "./creature-entity";

@Entity({
  name: "creature_type",
})
export class CreatureTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToMany(() => CreatureEntity, (creature) => creature.types)
  creatures: CreatureEntity[];
}
