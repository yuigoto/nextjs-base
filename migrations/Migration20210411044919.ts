import { Migration } from '@mikro-orm/migrations';

export class Migration20210411044919 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` change `firstName` `name` varchar(255) not null;');


    this.addSql('alter table `user` change `lastName` `email` varchar(255) not null;');


    this.addSql('alter table `user` add `website` varchar(255) not null;');
    this.addSql('alter table `user` drop `age`;');

    this.addSql('drop table if exists `migrations`;');

    this.addSql('drop table if exists `user_attribute`;');
  }

}
