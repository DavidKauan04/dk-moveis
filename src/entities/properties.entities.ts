import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./addresses.entities";
import { Category } from "./categories.entities";
import { Schedules } from "./schedules.entities";
import { v4 as uuid } from 'uuid'

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2 })
  value: number;

  @Column("integer")
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => Address, {
    eager: true,
  })@JoinColumn()
  address: Address;

  @ManyToOne((type) => Category, (Categories) => Categories.properties)
  category: Category;

  @OneToMany((type) => Schedules, (schedules) => schedules.properties, {eager: true})
  schedules: Schedules[];

  constructor() {
    if(!this.id){
      this.id = uuid()
    }
  }
}
