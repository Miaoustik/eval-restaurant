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

        $horaire2 = (new HoraireDay())
            ->setDayName('Mardi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;

        $horaire3 = (new HoraireDay())
            ->setDayName('Mercredi')
        ;

        $horaire4 = (new HoraireDay())
            ->setDayName('Jeudi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;

        $horaire5 = (new HoraireDay())
            ->setDayName('Vendredi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;

        $horaire6 = (new HoraireDay())
            ->setDayName('Samedi')
            ->setMorningStart(new \DateTime("12:00:00"))
            ->setMorningEnd(new \DateTime("14:00:00"))
            ->setEveningStart(new \DateTime("16:00:00"))
            ->setEveningEnd(new \DateTime("22:00:00"))
        ;

        $horaire7 = (new HoraireDay())
            ->setDayName('Dimanche')
        ;

        function addRotation ($start, $end, $maxCustomer, $horaire, $manager) {
            $startClone = clone $start;
            $loop = 1;
            while ($startClone->getTimestamp() <= $end->getTimestamp()) {
                $rotation = new Rotation();
                $rotation->setMaxCustomer($maxCustomer);
                $rotation->setDate(clone $startClone);
                $rotation->setCustomerNumber($maxCustomer->getValue() - 14 );
                $rotation->addReservation((new Reservation())->setAllergens('Noix')->setCustomerNumber(4));
                $rotation->addReservation((new Reservation())->setCustomerNumber(10));

                $horaire->addRotation($rotation);

                if ($loop % 5 === 0) {
                    $startClone = $startClone->add(new \DateInterval('PT1H15M'));
                } else {
                    $startClone = $startClone->add(new \DateInterval('PT15M'));
                }

                $loop++;

                $manager->persist($rotation);
            }
        }

        function setRotations ( HoraireDay $horaire, MaxCustomer $maxCustomer, ObjectManager $manager) {

            $horaireMorningStart = $horaire->getMorningStart();
            $horaireMorningEnd = $horaire->getMorningEnd();

            if ($horaireMorningStart !== null && $horaireMorningEnd !== null) {
                $limitHoraireMorning = $horaireMorningEnd->sub(new \DateInterval('PT1H'));
                addRotation($horaireMorningStart, $limitHoraireMorning, $maxCustomer, $horaire, $manager);
            }

            $horaireEveningStart = $horaire->getEveningStart();
            $horaireEveningEnd = $horaire->getEveningEnd();

            if ($horaireEveningStart !== null && $horaireEveningEnd !== null) {
                $limitHoraireEvening = $horaireEveningEnd->sub(new \DateInterval('PT1H'));
                addRotation($horaireEveningStart, $limitHoraireEvening, $maxCustomer, $horaire, $manager);
            }
        }

        for ($i = 0; $i < 7; $i++) {
            $horaireName = 'horaire' . ($i + 1);
            setRotations($$horaireName, $maxCustomer, $manager);
            $manager->persist($$horaireName);
        }

        $manager->flush();
    }
}
