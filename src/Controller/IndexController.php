<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class IndexController extends AbstractController
{
    #[Route(path: '/{string}', name: 'app_index' , requirements: ['string' => '.+'], defaults: ['string' => '/'], methods: ['GET'])]
    public function index (): Response
    {
        return $this->render('base.html.twig');
    }
}