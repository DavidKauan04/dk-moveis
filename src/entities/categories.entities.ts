import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Properties } from "./properties.entities";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, unique: true })
  name: string;

  @OneToMany((type) => Properties, (properties) => properties.category, {
    eager: true,
  })
  properties: Properties[];
}
