<?php

namespace App\Controller\Api;

use App\Entity\Reservation;
use App\Entity\Rotation;
use App\Repository\CategoryRepository;
use App\Repository\FormulaRepository;
use App\Repository\HoraireDayRepository;
use App\Repository\ImageRepository;
use App\Repository\MaxCustomerRepository;
use App\Repository\MenuRepository;
use App\Repository\RotationRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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

        return new JsonResponse(data: [
            "email" => $user?->getEmail(),
            "role" => $user?->getRoles()
        ]);
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

        $horairesJson = $this->serializer->serialize((count($horaires) !== 0 ? $horaires : null), JsonEncoder::FORMAT, [
            'groups' => ['HOME_DATA']
        ]);

        return new JsonResponse(data: $horairesJson, json: true);
    }

    #[Route(path: '/user', methods: ['GET'])]
    public function user (): Response
    {
        $user = $this->getUser();

        return new JsonResponse(data: [
            "email" => $user?->getEmail(),
            "role" => $user?->getRoles()
        ]);
    }

    #[Route(path: '/image', methods: ['GET'])]
    public function getImages (ImageRepository $repository): Response
    {
        $images = $repository->findAll();
        $data = $this->serializer->serialize(data: $images, format: JsonEncoder::FORMAT);

        return new JsonResponse(data: $data, json: true);
    }

    #[Route(path: '/carte', methods: ['GET'])]
    public function getCarte (CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAllEager();

        $json = $this->serializer->serialize($categories, JsonEncoder::FORMAT, [
            'groups' => ['GET_CARTE']
        ]);
        return new JsonResponse(data: $json, json: true);
    }

    #[Route(path: '/rotation', methods: ['POST'])]
    public function getRotation (RotationRepository $repository, Request $request): Response
    {
        $data = json_decode($request->getContent());

        $date = new DateTime($data->date, new \DateTimeZone('UTC'));

        /** @var Rotation|null $rotation */
        $rotation = $repository->findOneByDate($date);

        if (!$rotation) {
            return new JsonResponse(data: ['rotation' => '0']);
        }

        return new JsonResponse(data: [
            'id' => $rotation->getId(),
            'morning' => $rotation->getCustomerNumberMorning(),
            'evening' => $rotation->getCustomerNumberEvening()
        ]);
    }

    #[Route(path: '/max', methods: ['GET'])]
    public function max (MaxCustomerRepository $repository): Response
    {
        $max = $repository->findAll()[0];

        return new JsonResponse(data: ['value' => $max->getValue()]);
    }

    #[Route(path: '/reserver', methods: ['POST'])]
    public function reserver (Request $request, RotationRepository $rotationRepository, MaxCustomerRepository $maxCustomerRepository, EntityManagerInterface $manager): Response
    {
        $data = json_decode($request->getContent());
        $date = new DateTime($data->dateInput, new \DateTimeZone('UTC'));



        $hourSplit = explode(':', ($data->choice));
        $dateHour = clone $date;
        $dateHour->add(new \DateInterval('PT' . $hourSplit[0] . 'H' . $hourSplit[1] . 'M'));

        $max = ($maxCustomerRepository->findAll())[0];
        $rotation = $rotationRepository->findOneByDate($date);

        if ($rotation === null) {

            $rotation = new Rotation();
            $rotation->setMaxCustomer($max)
                ->setDate($date);
            $manager->persist($rotation);
        }

        $reservation = (new Reservation())
            ->setCustomerNumber($data->convive)
            ->setHour($dateHour);

        if ($data->allergen !== '') {
            $reservation->setAllergens($data->allergen);
        }

        if ($data->morning === true) {
            $nextCustomer = $rotation->getCustomerNumberMorning() + $data->convive;
            if ($nextCustomer > $max->getValue()) {
                return new JsonResponse(data: [
                    'errorMessage' => 'Plus de places disponibles'
                ], status: Response::HTTP_BAD_REQUEST);
            }
            $rotation->setCustomerNumberMorning($nextCustomer)
                ->addReservationMorning($reservation);
        } else {
            $nextCustomer = $rotation->getCustomerNumberEvening() + $data->convive;
            if ($nextCustomer > $max->getValue()) {
                return new JsonResponse(data: [
                    'errorMessage' => 'Plus de places disponibles'
                ], status: Response::HTTP_BAD_REQUEST);
            }
            $rotation->setCustomerNumberEvening($rotation->getCustomerNumberEvening() + $data->convive)
                ->addReservationEvening($reservation);
        }

        try {
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                'errorCode' => $e->getCode(),
                'errorMessage' => $e->getMessage()
            ], status: 500);
        }
    }

    #[Route(path: '/menu', methods: ['GET'])]
    public function getMenu (MenuRepository $repository): Response
    {
        $menus = $repository->findAllEager();

        $json = $this->serializer->serialize(data: $menus, format: JsonEncoder::FORMAT, context: [
            'groups' => ['GET_MENU']
        ]);

        return new JsonResponse(data: $json, json: true);
    }
}