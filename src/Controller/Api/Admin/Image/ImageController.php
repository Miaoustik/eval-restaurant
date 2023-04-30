<?php

namespace App\Controller\Api\Admin\Image;

use App\Entity\Image;
use App\Repository\ImageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

#[IsGranted('ROLE_ADMIN')]
#[Route('/api/admin/images')]
class ImageController extends AbstractController
{
    public function __construct(
        private readonly SerializerInterface $serializer,
        private readonly ImageRepository $repository,
        private readonly EntityManagerInterface $manager
    )
    {
    }

    #[Route(path: '/save', methods: ['POST'])]
    public function save(Request $request, SluggerInterface $slugger)
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
                $this->manager->persist($newImage);
            } catch (\Exception $e) {
                return new JsonResponse(data: [
                    'error' => $e->getMessage()
                ], status: 500);
            }
        }

        try {
            $this->manager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                'error' => $e->getMessage()
            ], status: 500);
        }

        $images = $this->repository->findAll();
        $data = $this->serializer->serialize(data: $images, format: JsonEncoder::FORMAT);

        return new JsonResponse(data: $data, json: true);
    }

    #[Route(path: '/deletebdd', methods: ['GET'])]
    public function deleteAllBdd (ImageRepository $repository, EntityManagerInterface $manager): Response
    {
        $images = $repository->findAll();
        try {
            foreach ($images as $image) {
                unlink($this->getParameter('uploads_images') . '/' . $image->getName());
                $repository->remove($image);
            }
            $manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: ["error" => $e->getMessage()], status: 500);
        }


    }
}