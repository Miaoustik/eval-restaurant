<?php

namespace App\Controller\Api\Admin;

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
    public function modify (Request $request, SerializerInterface $serializer): Response
    {
        $data = json_decode($request->getContent());

        $json = $serializer->serialize($data, JsonEncoder::FORMAT);
        return new JsonResponse(data: $json, json: true);
    }
}