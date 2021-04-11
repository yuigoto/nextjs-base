import { Migration } from '@mikro-orm/migrations';

export class Migration20210411041013 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `todo` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `description` varchar(255) null) default character set utf8mb4 engine = InnoDB;');
  }

}
