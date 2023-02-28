import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Properties } from "./properties.entities";
import { User } from "./users.entities";

@Entity("schedules")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  date: string;

  @Column("time")
  hour: string;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @ManyToOne((type) => Properties, (properties) => properties.schedules)
  @JoinColumn()
  properties: Properties;
}
