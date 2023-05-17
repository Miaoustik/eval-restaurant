<?php

namespace App\Controller\Api\Admin;

use App\Entity\Formula;
use App\Entity\Menu;
use App\Repository\FormulaRepository;
use App\Repository\MenuRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[IsGranted('ROLE_ADMIN')]
#[Route('/api/admin/menu')]
class MenuController extends AbstractController
{

    #[Route(path: '/modify-title', methods: ['POST'])]
    public function modifyTitle (Request $request, MenuRepository $repository, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());

        $menu = $repository->find($data->id);
        $menu->setTitle($data->title);

        try {
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                'errorMessage' => $e->getMessage(),
                'errorCode' => $e->getCode()
            ], status: 500);
        }
    }

    #[Route(path: '/modify-formula', methods: ['POST'])]
    public function modifyFormula (Request $request, FormulaRepository $repository, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());
        $formula = $repository->find($data->formula);

        if ($data->title !== '') {
            $formula->setTitle($data->title);
        }

        if ($data->description !== '') {
            $formula->setDescription($data->description);
        }

        if ($data->price !== '') {
            $formula->setPrice($data->price);
        }

        try {
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                'errorMessage' => $e->getMessage(),
                'errorCode' => $e->getCode()
            ], status: 500);
        }
    }

    #[Route('/create', methods: ['POST'])]
    public function create (Request $request, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());
        $menu = (new Menu())->setTitle($data->title);

        foreach ($data->formulas as $formula) {
            $formula = (new Formula())
                ->setTitle($formula->title)
                ->setDescription($formula->description)
                ->setPrice($formula->price);

            $menu->addFormula($formula);
        }

        try {
            $manager->persist($menu);
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                "errorCode" => $e->getCode(),
                "errorMessage" => $e->getMessage()
            ], status: 500);
        }
    }

    #[Route(path: '/delete-formula', methods: ['POST'])]
    public function deleteFormula (FormulaRepository $repository, Request $request, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());
        $formula = $repository->find($data->id);

        try {
            $manager->remove($formula);
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                "errorCode" => $e->getCode(),
                "errorMessage" => $e->getMessage()
            ], status: 500);
        }
    }

    #[Route(path: '/delete-menu', methods: ['POST'])]
    public function deleteMenu (MenuRepository $repository, Request $request, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());
        $menu = $repository->find($data->id);

        try {
            $manager->remove($menu);
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                "errorCode" => $e->getCode(),
                "errorMessage" => $e->getMessage()
            ], status: 500);
        }
    }

    #[Route(path: '/add-formula', methods: ['POST'])]
    public function addFormula (MenuRepository $repository, Request $request, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());
        $menu = $repository->find($data->menuId);
        $formula = (new Formula())
            ->setTitle($data->formula->title)
            ->setDescription($data->formula->description)
            ->setPrice($data->formula->price);
        $menu->addFormula($formula);

        try {
            $manager->flush();
            return new JsonResponse(data: [
                'formulaId' => $formula->getId()
            ], status: Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                "errorCode" => $e->getCode(),
                "errorMessage" => $e->getMessage()
            ], status: 500);
        }
    }
}