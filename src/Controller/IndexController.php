<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class IndexController extends AbstractController
{
    #[Route(path: '/', methods: ['GET'])]
    #[Route(path: '/admin/carte', methods: ['GET'])]
    #[Route(path: '/admin/image', methods: ['GET'])]
    #[Route(path: '/reserver', methods: ['GET'])]
    #[Route(path: '/carte', methods: ['GET'])]
    #[Route(path: '/menus', methods: ['GET'])]
    #[Route(path: '/inscription', methods: ['GET'])]
    #[Route(path: '/login', methods: ['GET'])]
    #[Route(path: '/admin/horaire', methods: ['GET'])]
    public function index (): Response
    {
        return $this->render('base.html.twig');
    }
}