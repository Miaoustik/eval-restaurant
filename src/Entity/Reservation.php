<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['GET_RESERVATION'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['GET_RESERVATION'])]
    private ?int $customerNumber = null;

    #[ORM\ManyToOne(inversedBy: 'reservationsMorning')]
    private ?Rotation $rotationMorning = null;

    #[ORM\ManyToOne(inversedBy: 'reservationsEvening')]
    private ?Rotation $rotationEvening = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['GET_RESERVATION'])]
    private ?string $allergens = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['GET_RESERVATION'])]
    private ?\DateTimeInterface $hour = null;

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

    public function getHour(): ?\DateTimeInterface
    {
        return $this->hour;
    }

    public function setHour(\DateTimeInterface $hour): self
    {
        $this->hour = $hour;

        return $this;
    }
}
