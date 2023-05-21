<?php

namespace App\Controller\Api\Admin;

use App\Entity\MaxCustomer;
use App\Entity\Rotation;
use App\Repository\MaxCustomerRepository;
use App\Repository\ReservationRepository;
use App\Repository\RotationRepository;
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
#[Route(path: '/api/admin', methods: ['GET'])]
class AdminController extends AbstractController
{
    #[Route('/reservation', methods: ['POST'])]
    public function index (RotationRepository $repository, Request $request, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent());

        $date = new \DateTime($data->date);

        /** @var Rotation|null $rotation */
        $rotation = $repository->findOneByDateEager($date);

        $response = [
            "morning" => $rotation?->getReservationsMorning(),
            "evening" => $rotation?->getReservationsEvening()
        ];

        $json = $serializer->serialize($response, JsonEncoder::FORMAT, [
            "groups" => ['GET_RESERVATION']
        ]);

        return new JsonResponse(data: $json, json: true);
    }

    #[Route('/update-max', methods: ['POST'])]
    public function updateMax (Request $request, MaxCustomerRepository $repository, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());

        $max = $repository->findAll();

        if (count($max) === 0) {
            $max = new MaxCustomer();
            $max->setValue($data->max);
            $manager->persist($max);
        } else {
            $max[0]->setValue($data->max);
        }

        try {
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                "errorCode" => $e->getCode(),
                "errorMessage" => $e->getMessage()
            ], status: 500);
        }

    }
}