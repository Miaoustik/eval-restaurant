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

    #[ORM\ManyToOne(inversedBy: 'reservationsMorning')]
    private ?Rotation $rotationMorning = null;

    #[ORM\ManyToOne(inversedBy: 'reservationsEvening')]
    private ?Rotation $rotationEvening = null;

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

    public function getRotationMorning(): ?Rotation
    {
        return $this->rotationMorning;
    }

    public function setRotationMorning(?Rotation $rotationMorning): self
    {
        $this->rotationMorning = $rotationMorning;

        return $this;
    }

    public function getRotationEvening(): ?Rotation
    {
        return $this->rotationEvening;
    }

    public function setRotationEvening(?Rotation $rotationEvening): self
    {
        $this->rotationEvening = $rotationEvening;

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
