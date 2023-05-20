<?php

namespace App\Controller\Api\Admin;

use App\Entity\Rotation;
use App\Repository\ReservationRepository;
use App\Repository\RotationRepository;
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
}