<?php

namespace App\Controller\Api;

use App\Entity\Image;
use App\Repository\ImageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/api/images')]
class ImageController extends AbstractController
{
    public function __construct(private readonly SerializerInterface $serializer, private readonly ImageRepository $repository)
    {
    }

    #[Route(path: '', methods: ['POST'])]
    public function save (Request $request, SluggerInterface $slugger, EntityManagerInterface $manager): Response
    {
        /** @var UploadedFile[] $images */
        $images = $request->files;

        foreach ($images as $image) {

            $originalName = pathinfo( $image->getClientOriginalName(), PATHINFO_FILENAME);
            $safeName = $slugger->slug($originalName);
            $newName = $safeName . '-' . uniqid() . '.' . $image->guessExtension();

            $newImage = (new Image())
                ->setName($newName)
                ->setTitle('Titre de test');

            try {
                $image->move(
                    $this->getParameter('uploads_images'),
                    $newName
                );
                $manager->persist($newImage);
            } catch (\Exception $e) {
                return new JsonResponse(data: $e->getMessage(), status: 500);
            }
        }

        try {
            $manager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(data: $e->getMessage(), status: 500);
        }

        return $this->getImages();

    }

    #[Route('/names')]
    public function sendImages (): Response
    {
        return $this->getImages();
    }

    #[Route(path: '/get/{name}')]
    public function getImage($name): Response
    {
        $image = new File( $this->getParameter('uploads_images') . '/' . $name);
        return new BinaryFileResponse($image);
    }

    private function getImages (): Response
    {
        $images = $this->repository->findAll();

        $imagesArray = [];

        foreach ($images as $image) {
            $imagesArray[] = $image->getName();
        }

        return new JsonResponse($this->serializer->serialize($imagesArray, JsonEncoder::FORMAT), json: true);
    }
}