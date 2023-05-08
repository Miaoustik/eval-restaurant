<?php

namespace App\Controller\Api\Admin;

use App\Repository\DishRepository;
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
        private readonly SerializerInterface $serializer
    )
    {
    }

    #[Route(path: '/modify')]
    public function modifyDishe(Request $request, DishRepository $dishRepository): Response
    {
        $data = $request->getContent();

        //TODO Suite


        $json = $this->serializer->serialize($data, JsonEncoder::FORMAT);
        return new JsonResponse(data: $json, json: true);
    }
}