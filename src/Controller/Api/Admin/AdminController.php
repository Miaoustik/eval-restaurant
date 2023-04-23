<?php

namespace App\Controller\Api\Admin;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[IsGranted('ROLE_ADMIN')]
#[Route(path: '/api/admin', methods: ['GET'])]
class AdminController extends AbstractController
{
    #[Route('/')]
    public function index (): Response
    {
        return new Response();
    }
}