import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreatureEntity } from "./creature-entity";

@Entity({
  name: "resistance",
})
export class ResistanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => CreatureEntity, (creature) => creature.resistances)
  creatures: CreatureEntity[];
}
