<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Event\LogoutEvent;

#[AsEventListener]
class LogoutListener
{
    public function __invoke(LogoutEvent $event): void
    {
        $event->setResponse(new JsonResponse(status: Response::HTTP_NO_CONTENT));
    }
}