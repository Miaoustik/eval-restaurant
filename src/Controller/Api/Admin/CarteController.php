<?php

namespace App\Controller\Api\Admin;

use App\Entity\Category;
use App\Entity\Dish;
use App\Repository\CategoryRepository;
use App\Repository\DishRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/admin/carte')]
#[IsGranted('ROLE_ADMIN')]
class CarteController extends AbstractController
{
    public function __construct(
        private readonly SerializerInterface $serializer,
        private readonly EntityManagerInterface $manager
    )
    {
    }

    #[Route(path: '/modify')]
    public function modifyDishe(Request $request, DishRepository $dishRepository, CategoryRepository $categoryRepository): Response
    {
        $data = json_decode($request->getContent());

        $dish = $dishRepository->findEager($data->id);

        if ($data->title !== '') {
            $dish->setTitle($data->title);
        }

        if ($data->description !== '') {
            $dish->setDescription($data->description);
        }

        if ($data->price !== '') {
            $dish->setPrice($data->price);
        }

        if ($data->category !== '') {
            $category = $categoryRepository->find($data->category);
            $dish->setCategory($category);
        }

        try {
            $this->manager->flush();
            $jsonDish = $this->serializer->serialize($dish, JsonEncoder::FORMAT, [
                'groups' => ['GET_DISH']
            ]);
            return new JsonResponse(data: $jsonDish, json: true);

        } catch (\Exception $e) {
            return new JsonResponse(data: ['error' => $e->getMessage()], status: Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route(path: '/create-dish', methods: ['POST'])]
    public function createDish (Request $request, CategoryRepository $categoryRepository): Response
    {
        $data = json_decode($request->getContent());

        $dish = new Dish();
        $category = $categoryRepository->find($data->category);
        $dish->setTitle($data->title)
            ->setDescription($data->description)
            ->setPrice($data->price)
            ->setCategory($category);

        try {
            $this->manager->persist($dish);
            $this->manager->flush();
            $jsonData = $this->serializer->serialize(data: $dish, format: JsonEncoder::FORMAT, context: [
                'groups' => ['GET_DISH']
            ]);
            return new JsonResponse(data: $jsonData, json: true);
        } catch (\Exception $e) {
            return new JsonResponse(data: ["error" => $e->getMessage()], status: 500);
        }
    }

    #[Route(path: '/delete-dish', methods: ['POST'])]
    public function deleteDish (Request $request, DishRepository $dishRepository) :Response
    {
        $data = json_decode($request->getContent());

        $dish = $dishRepository->find($data->id);

        try {
            $this->manager->remove($dish);
            $this->manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: ["error" => $e->getMessage()], status: 500);
        }
    }
}