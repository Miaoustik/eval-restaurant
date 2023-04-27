<?php

namespace App\Controller\Api;

use App\Repository\HoraireDayRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
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

        return new JsonResponse(data: $user->getEmail());
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

        return new JsonResponse(data: $user?->getEmail());
    }
}