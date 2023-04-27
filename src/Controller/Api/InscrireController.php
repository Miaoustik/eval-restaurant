<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/inscription')]
class InscrireController extends AbstractController
{
    #[Route(path: '/inscrire', methods: ['POST'])]
    public function inscrire (EntityManagerInterface $manager, Request $request, UserPasswordHasherInterface $hasher): Response
    {
        $data = json_decode($request->getContent());

        $user = new User();
        $user->setEmail($data->username)
            ->setRoles(['ROLE_USER'])
            ->setAllergens( strlen($data->allergen) > 0 ? $data->allergen : null)
            ->setNumber($data->convive);
        $user->setPassword($hasher->hashPassword($user, 'test'));

        try {
            $manager->persist($user);
            $manager->flush();
            return new JsonResponse(data: $user->getEmail(), status: Response::HTTP_CREATED);
        } catch (\Exception $e) {
            if ($e->getCode() === 7) {
                return new JsonResponse(data: [
                    'error' => "Cette adresse mail existe déjà."
                ], status: Response::HTTP_CONFLICT);
            }
            return new JsonResponse(data: [
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ], status: Response::HTTP_BAD_GATEWAY);
        }
    }
}