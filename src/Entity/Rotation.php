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
    private ?int $customerNumber = null;

    #[ORM\ManyToOne(inversedBy: 'rotations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?MaxCustomer $maxCustomer = null;

    #[ORM\ManyToOne(inversedBy: 'rotations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?HoraireDay $horaireDay = null;

    #[ORM\OneToMany(mappedBy: 'rotation', targetEntity: Reservation::class, cascade: ['persist'])]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
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

    public function getCustomerNumber(): ?int
    {
        return $this->customerNumber;
    }

    public function setCustomerNumber(int $customerNumber): self
    {
        $this->customerNumber = $customerNumber;

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

    public function getHoraireDay(): ?HoraireDay
    {
        return $this->horaireDay;
    }

    public function setHoraireDay(?HoraireDay $horaireDay): self
    {
        $this->horaireDay = $horaireDay;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setRotation($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getRotation() === $this) {
                $reservation->setRotation(null);
            }
        }

        return $this;
    }
}
