import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string" })
  email!: string;

  @Property({ type: "string" })
  website!: string;

  constructor (name: string, email: string, website: string) {
    this.name = name;
    this.email = email;
    this.website = website;
  }
}
