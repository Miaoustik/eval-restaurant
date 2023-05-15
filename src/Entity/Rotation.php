<?php

namespace App\Entity;

use App\Repository\RotationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RotationRepository::class)]
class Rotation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $customerNumberMorning = 0;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $customerNumberEvening = 0;

    #[ORM\ManyToOne(inversedBy: 'rotations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?MaxCustomer $maxCustomer = null;

    #[ORM\OneToMany(mappedBy: 'rotationMorning', targetEntity: Reservation::class, cascade: ['persist'])]
    private Collection $reservationsMorning;

    #[ORM\OneToMany(mappedBy: 'rotationEvening', targetEntity: Reservation::class, cascade: ['persist'])]
    private Collection $reservationsEvening;

    public function __construct()
    {
        $this->reservationsMorning = new ArrayCollection();
        $this->reservationsEvening = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getCustomerNumberMorning(): ?int
    {
        return $this->customerNumberMorning;
    }

    public function setCustomerNumberMorning(int $customerNumberMorning): self
    {
        $this->customerNumberMorning = $customerNumberMorning;

        return $this;
    }

    public function getCustomerNumberEvening(): ?int
    {
        return $this->customerNumberEvening;
    }

    public function setCustomerNumberEvening(int $customerNumberEvening): self
    {
        $this->customerNumberEvening = $customerNumberEvening;

        return $this;
    }

    public function getMaxCustomer(): ?MaxCustomer
    {
        return $this->maxCustomer;
    }

    public function setMaxCustomer(?MaxCustomer $maxCustomer): self
    {
        $this->maxCustomer = $maxCustomer;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservationsMorning(): Collection
    {
        return $this->reservationsMorning;
    }

    public function addReservationMorning(Reservation $reservation): self
    {
        if (!$this->reservationsMorning->contains($reservation)) {
            $this->reservationsMorning->add($reservation);
            $reservation->setRotationMorning($this);
        }

        return $this;
    }

    public function removeReservationMorning(Reservation $reservation): self
    {
        if ($this->reservationsMorning->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getRotationMorning() === $this) {
                $reservation->setRotationMorning(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservationsEvening(): Collection
    {
        return $this->reservationsEvening;
    }

    public function addReservationEvening(Reservation $reservation): self
    {
        if (!$this->reservationsEvening->contains($reservation)) {
            $this->reservationsEvening->add($reservation);
            $reservation->setRotationEvening($this);
        }

        return $this;
    }

    public function removeReservationEvening(Reservation $reservation): self
    {
        if ($this->reservationsEvening->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getRotationEvening() === $this) {
                $reservation->setRotationEvening(null);
            }
        }

        return $this;
    }
}
