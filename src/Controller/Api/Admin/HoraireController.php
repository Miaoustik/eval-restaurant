<?php

namespace App\Controller\Api\Admin;

use App\Entity\HoraireDay;
use App\Repository\HoraireDayRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

#[IsGranted('ROLE_ADMIN')]
#[Route('/api/admin/horaire')]
class HoraireController extends AbstractController
{
    #[Route(path: '/modify', methods: ['POST'])]
    public function modify (
        Request $request,
        HoraireDayRepository $repository,
        EntityManagerInterface $manager,
        SerializerInterface $serializer
    ): Response
    {

        $newHoraires = json_decode($request->getContent());
        $horaires = $repository->findAll();

        if (count($horaires) === 0) {
            $days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            foreach ($days as $day) {
                $newHoraire = (new HoraireDay())->setDayName($day);
                $horaires[] = $newHoraire;
                $manager->persist($newHoraire);
            }
        }


        foreach ($horaires as $horaire) {

            $dayName = $horaire->getDayName();
            $newDay = $newHoraires->$dayName;

            $morningClosed = $newDay->morningClosed;
            $morningStart = null;
            $morningEnd = null;

            if ($morningClosed === false) {
                $morningStart = new \DateTime($newDay->morningStart, new \DateTimeZone('Europe/Paris'));
                $morningEnd = new \DateTime($newDay->morningEnd, new \DateTimeZone('Europe/Paris'));
            }

            $horaire->setMorningStart($morningStart);
            $horaire->setMorningEnd($morningEnd);

            $eveningClosed = $newDay->eveningClosed;
            $eveningStart = null;
            $eveningEnd = null;

            if ($eveningClosed === false) {
                $eveningStart = new \DateTime($newDay->eveningStart, new \DateTimeZone('Europe/Paris'));
                $eveningEnd = new \DateTime($newDay->eveningEnd, new \DateTimeZone('Europe/Paris'));
            }

            $horaire->setEveningStart($eveningStart);
            $horaire->setEveningEnd($eveningEnd);
        }

        try {
            $manager->flush();
            $response = $serializer->serialize(data: $horaires, format: JsonEncoder::FORMAT, context: [
                'groups' => ['HOME_DATA']
            ]);

            return new JsonResponse(data: $response, json: true);
        } catch (\Exception $exception) {
            return new JsonResponse(data: [
                'errorMessage' => $exception->getMessage(),
                'errorCode' => $exception->getCode()
            ], status: 500);
        }
    }
}