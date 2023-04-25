<?php

namespace App\Entity;

use App\Repository\HoraireDayRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: HoraireDayRepository::class)]
class HoraireDay
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['HOME_DATA'])]
    #[ORM\Column(length: 50)]
    private ?string $dayName = null;

    #[Groups(['HOME_DATA'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $morningStart = null;

    #[Groups(['HOME_DATA'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $morningEnd = null;

    #[Groups(['HOME_DATA'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $eveningStart = null;

    #[Groups(['HOME_DATA'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $eveningEnd = null;

    #[ORM\OneToMany(mappedBy: 'horaireDay', targetEntity: Rotation::class)]
    private Collection $rotations;

    public function __construct()
    {
        $this->rotations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayName(): ?string
    {
        return $this->dayName;
    }

    public function setDayName(string $dayName): self
    {
        $this->dayName = $dayName;

        return $this;
    }

    public function getMorningStart(): ?\DateTimeInterface
    {
        return $this->morningStart;
    }

    public function setMorningStart(?\DateTimeInterface $morningStart): self
    {
        $this->morningStart = $morningStart;

        return $this;
    }

    public function getMorningEnd(): ?\DateTimeInterface
    {
        return $this->morningEnd;
    }

    public function setMorningEnd(?\DateTimeInterface $morningEnd): self
    {
        $this->morningEnd = $morningEnd;

        return $this;
    }

    public function getEveningStart(): ?\DateTimeInterface
    {
        return $this->eveningStart;
    }

    public function setEveningStart(?\DateTimeInterface $eveningStart): self
    {
        $this->eveningStart = $eveningStart;

        return $this;
    }

    public function getEveningEnd(): ?\DateTimeInterface
    {
        return $this->eveningEnd;
    }

    public function setEveningEnd(?\DateTimeInterface $eveningEnd): self
    {
        $this->eveningEnd = $eveningEnd;

        return $this;
    }

    /**
     * @return Collection<int, Rotation>
     */
    public function getRotations(): Collection
    {
        return $this->rotations;
    }

    public function addRotation(Rotation $rotation): self
    {
        if (!$this->rotations->contains($rotation)) {
            $this->rotations->add($rotation);
            $rotation->setHoraireDay($this);
        }

        return $this;
    }

    public function removeRotation(Rotation $rotation): self
    {
        if ($this->rotations->removeElement($rotation)) {
            // set the owning side to null (unless already changed)
            if ($rotation->getHoraireDay() === $this) {
                $rotation->setHoraireDay(null);
            }
        }

        return $this;
    }
}
