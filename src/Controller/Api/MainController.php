<?php

namespace App\Controller\Api;

use App\Repository\HoraireDayRepository;
use App\Repository\ImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class MainController extends AbstractController
{

    public function __construct(private readonly SerializerInterface $serializer)
    {
    }

    #[Route(path: '/login', name: 'app_login' , methods: ['POST'])]
    public function login (): Response
    {
        $user = $this->getUser();

        return new JsonResponse(data: [
            "email" => $user?->getEmail(),
            "role" => $user?->getRoles()
        ]);
    }

    #[Route(path: '/logout', name: 'app_logout', methods: ['GET'])]
    public function logout ()
    {
    }

    #[Route(path: '/horaire', methods: ['GET'])]
    public function getData (HoraireDayRepository $horaireDayRepository): Response
    {
        $horaires = $horaireDayRepository->findAll();
        $horairesJson = null;

        if ($horaires) {
            $horairesJson = $this->serializer->serialize($horaires, JsonEncoder::FORMAT, [
                'groups' => ['HOME_DATA']
            ]);
        }

        return new JsonResponse(data: $horairesJson, json: true);
    }

    #[Route(path: '/user', methods: ['GET'])]
    public function user (): Response
    {
        $user = $this->getUser();

        return new JsonResponse(data: [
            "email" => $user?->getEmail(),
            "role" => $user?->getRoles()
        ]);
    }

    #[Route(path: '/image', methods: ['GET'])]
    public function getImages (ImageRepository $repository): Response
    {
        $images = $repository->findAll();
        $data = $this->serializer->serialize(data: $images, format: JsonEncoder::FORMAT);

        return new JsonResponse(data: $data, json: true);
    }
}