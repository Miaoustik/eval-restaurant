<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230515174134 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE dish_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE formula_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE horaire_day_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE image_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE max_customer_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE menu_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reservation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE rotation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE dish (id INT NOT NULL, category_id INT DEFAULT NULL, title VARCHAR(150) NOT NULL, description TEXT NOT NULL, price NUMERIC(6, 2) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_957D8CB812469DE2 ON dish (category_id)');
        $this->addSql('CREATE TABLE formula (id INT NOT NULL, menu_id INT NOT NULL, title VARCHAR(100) NOT NULL, description TEXT NOT NULL, price NUMERIC(6, 2) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_67315881CCD7E912 ON formula (menu_id)');
        $this->addSql('CREATE TABLE horaire_day (id INT NOT NULL, day_name VARCHAR(50) NOT NULL, morning_start TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, morning_end TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, evening_start TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, evening_end TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE image (id INT NOT NULL, title VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE max_customer (id INT NOT NULL, value SMALLINT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE menu (id INT NOT NULL, title VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE reservation (id INT NOT NULL, rotation_morning_id INT DEFAULT NULL, rotation_evening_id INT DEFAULT NULL, customer_number SMALLINT NOT NULL, allergens TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_42C849554E6985C5 ON reservation (rotation_morning_id)');
        $this->addSql('CREATE INDEX IDX_42C849552BA30929 ON reservation (rotation_evening_id)');
        $this->addSql('CREATE TABLE rotation (id INT NOT NULL, max_customer_id INT NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, customer_number_morning SMALLINT NOT NULL, customer_number_evening SMALLINT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_297C98F12E3B42DC ON rotation (max_customer_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, number SMALLINT DEFAULT NULL, allergens TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE dish ADD CONSTRAINT FK_957D8CB812469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE formula ADD CONSTRAINT FK_67315881CCD7E912 FOREIGN KEY (menu_id) REFERENCES menu (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849554E6985C5 FOREIGN KEY (rotation_morning_id) REFERENCES rotation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849552BA30929 FOREIGN KEY (rotation_evening_id) REFERENCES rotation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rotation ADD CONSTRAINT FK_297C98F12E3B42DC FOREIGN KEY (max_customer_id) REFERENCES max_customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE dish_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE formula_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE horaire_day_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE image_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE max_customer_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE menu_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reservation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE rotation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE dish DROP CONSTRAINT FK_957D8CB812469DE2');
        $this->addSql('ALTER TABLE formula DROP CONSTRAINT FK_67315881CCD7E912');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C849554E6985C5');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C849552BA30929');
        $this->addSql('ALTER TABLE rotation DROP CONSTRAINT FK_297C98F12E3B42DC');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE dish');
        $this->addSql('DROP TABLE formula');
        $this->addSql('DROP TABLE horaire_day');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE max_customer');
        $this->addSql('DROP TABLE menu');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE rotation');
        $this->addSql('DROP TABLE "user"');
    }
}
