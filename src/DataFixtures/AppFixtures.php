<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Dish;
use App\Entity\Formula;
use App\Entity\HoraireDay;
use App\Entity\MaxCustomer;
use App\Entity\Menu;
use App\Entity\Reservation;
use App\Entity\Rotation;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    public function __construct(private readonly UserPasswordHasherInterface $hasher)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $entrie = (new Category())->setName('Entrées');
        $plats = (new Category())->setName('Plats');
        $desserts = (new Category())->setName('Desserts');

        $entrie->addDish((new Dish())
            ->setTitle('Salade')
            ->setPrice(6.50)
            ->setDescription('Salade, tomate, oignons, ...')
        );

        $entrie->addDish((new Dish())
            ->setTitle('Quiche')
            ->setPrice(6.50)
            ->setDescription('Oeuf, creme, pates, ...')
        );

        $plats->addDish((new Dish())
            ->setTitle('nems au poulet')
            ->setDescription('nems, poulet, sauce')
            ->setPrice(6.88)
        );

        $plats->addDish((new Dish())
            ->setTitle('nems au porc')
            ->setDescription('nems, porc, sauce')
            ->setPrice(6.88)
        );

        $desserts->addDish((new Dish())
            ->setTitle('Ile flottante')
            ->setDescription('Oeuf, creme anglaise, etc..')
            ->setPrice(7)
        );

        $desserts->addDish((new Dish())
            ->setTitle('Tarte aux pommes')
            ->setDescription('Oeuf, pommes, etc..')
            ->setPrice(7)
        );

        $menu1 = (new Menu())
            ->setTitle('Menu du marché')
        ;

        $menu1->addFormula((new Formula())
            ->setTitle('Formule Diner')
            ->setDescription('Entrées + plats + desserts')
            ->setPrice(20)
        );

        $menu1->addFormula((new Formula())
            ->setTitle('Formule déjeuner')
            ->setDescription('Entrées ou plats + dessert')
            ->setPrice(16)
        );

        $manager->persist($menu1);
        $manager->persist($entrie);
        $manager->persist($plats);
        $manager->persist($desserts);

        for ($i = 0; $i < 5; $i++) {

            $user = (new User())
                ->setEmail("user$i@user.fr")
                ->setRoles(['ROLE_USER'])
            ;

            $user->setPassword($this->hasher->hashPassword($user, 'test'));
            $user->setNumber($i);
            if ($i > 2) {
                $user->setAllergens("Allergies de test");
            }
            $manager->persist($user);
        }

        $admin = (new User)->setEmail('admin@admin.fr');
        $admin->setPassword($this->hasher->hashPassword($admin, 'test'));
        $admin->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);


        $maxCustomer = (new MaxCustomer())
            ->setValue(100);

        $manager->persist($maxCustomer);

        $horaire1 = (new HoraireDay())
            ->setDayName('Lundi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;

        $manager->persist($horaire1);

        $horaire2 = (new HoraireDay())
            ->setDayName('Mardi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;
        $manager->persist($horaire2);

        $horaire3 = (new HoraireDay())
            ->setDayName('Mercredi')
        ;
        $manager->persist($horaire3);


        $horaire4 = (new HoraireDay())
            ->setDayName('Jeudi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;
        $manager->persist($horaire4);


        $horaire5 = (new HoraireDay())
            ->setDayName('Vendredi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;
        $manager->persist($horaire5);


        $horaire6 = (new HoraireDay())
            ->setDayName('Samedi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;
        $manager->persist($horaire6);


        $horaire7 = (new HoraireDay())
            ->setDayName('Dimanche')
        ;
        $manager->persist($horaire7);


        $manager->flush();
    }
}
