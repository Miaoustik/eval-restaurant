<?php

namespace App\Controller\Api;

use App\Repository\HoraireDayRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/home')]
class HomeController extends AbstractController
{

    public function __construct(private readonly SerializerInterface $serializer)
    {
    }

    #[Route(path: '/data', methods: ['GET'])]
    public function getData (HoraireDayRepository $horaireDayRepository): Response
    {
        $horaires = $horaireDayRepository->findAll();

        $horairesJson = $this->serializer->serialize($horaires, JsonEncoder::FORMAT, [
            'groups' => ['HOME_DATA']
        ]);

        return new JsonResponse(data: $horairesJson, json: true);
    }
}