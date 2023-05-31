<?php

namespace App\Controller\Api\Admin;

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

        foreach ($images as $key => $image) {
            $id = substr($key, -1);
            $title = $request->request->get('title-' . $id);
            $originalName = pathinfo( $image->getClientOriginalName(), PATHINFO_FILENAME);
            $safeName = $slugger->slug($originalName);
            $newName = $safeName . '-' . uniqid() . '.' . $image->guessExtension();


            $newImage = (new Image())
                ->setName($newName)
                ->setTitle($title);

            try {
                $image->move(
                    $this->getParameter('uploads_images'),
                    $newName
                );
                $this->manager->persist($newImage);
                $this->manager->flush();
            } catch (\Exception $e) {
                return new JsonResponse(data: [
                    'error' => $this->serializer->serialize(data: $e, format: JsonEncoder::FORMAT)
                ], status: 500);
            }
        }

        $images = $this->repository->findAll();
        $data = $this->serializer->serialize(data: $images, format: JsonEncoder::FORMAT);

        return new JsonResponse(data: $data, json: true);
    }

    #[Route(path: '/deletebdd', methods: ['GET'])]
    public function deleteAllBdd (ImageRepository $repository): Response
    {
        $images = $repository->findAll();
        try {
            foreach ($images as $image) {
                unlink($this->getParameter('uploads_images') . '/' . $image->getName());
                $repository->remove($image);
            }
            $this->manager->flush();
            return new JsonResponse(status: Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(data: ["error" => $e->getMessage()], status: 500);
        }
    }

    #[Route(path: '/delete', methods: ['POST'])]
    public function delete (Request $request): Response
    {
        $data = json_decode($request->getContent());
        $id = $data->id;

        $image = $this->repository->find($id);


        try {
            unlink($this->getParameter('uploads_images') . '/' . $image->getName());
            $this->manager->remove($image);
            $this->manager->flush();
            return new JsonResponse(data: [
                'id' => $id
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(data: [
                "errorCode" => $e->getCode(),
                "errorMessage" => $e->getMessage()
            ], status: Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route(path: '/title', methods: ['POST'])]
    public function updateTitle (Request $request): Response
    {
        $data = json_decode($request->getContent());

        $image = $this->repository->find($data->id);
        $image->setTitle($data->title);

        try {
            $this->manager->flush();
            return new JsonResponse([
                'title' => $image->getTitle()
            ]);
        } catch (\Exception $e){
            return new JsonResponse(
                data: [
                    'errorCode' => $e->getCode(),
                    'errorMessage' => $e->getMessage()
                ],
                status: Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    private function debug ( $data ): Response
    {
        return new JsonResponse(data: $this->serializer->serialize($data, JsonEncoder::FORMAT), json: true );

    }
}