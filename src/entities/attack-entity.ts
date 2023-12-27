import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { CreatureEntity } from "./creature-entity";

export enum AttackType {
  Fast = "Fast",
  Special = "Special",
}

@Entity({
  name: "attack",
})
export class AttackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  damage: number;

  @Column({
    type: "enum",
    enum: AttackType,
  })
  attackType: AttackType;

  @ManyToMany(() => CreatureEntity, (creature) => creature.attacks)
  creatures: CreatureEntity[];
}
