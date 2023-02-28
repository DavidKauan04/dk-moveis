import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from 'uuid'
@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 100, nullable: true })
  number: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 2 })
  state: string;

  constructor() {
    if(!this.id){
      this.id = uuid()
    }
  }
}
