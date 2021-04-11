import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Todo {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string", nullable: true })
  description?: string;

  constructor (name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}
