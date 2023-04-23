<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $customerNumber = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Rotation $rotation = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $allergens = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomerNumber(): ?int
    {
        return $this->customerNumber;
    }

    public function setCustomerNumber(int $customerNumber): self
    {
        $this->customerNumber = $customerNumber;

        return $this;
    }

    public function getRotation(): ?Rotation
    {
        return $this->rotation;
    }

    public function setRotation(?Rotation $rotation): self
    {
        $this->rotation = $rotation;

        return $this;
    }

    public function getAllergens(): ?string
    {
        return $this->allergens;
    }

    public function setAllergens(?string $allergens): self
    {
        $this->allergens = $allergens;

        return $this;
    }
}
