<?php

namespace App\Entity;

use App\Repository\DishRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DishRepository::class)]
class Dish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['GET_CARTE'])]
    private ?int $id = null;

    #[Groups(['GET_CARTE'])]
    #[ORM\Column(length: 150)]
    private ?string $title = null;

    #[Groups(['GET_CARTE'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[Groups(['GET_CARTE'])]
    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 2)]
    private ?string $price = null;

    #[ORM\ManyToOne(inversedBy: 'dishes')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Category $category = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
}
