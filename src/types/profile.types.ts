export type Species = 'dog' | 'cat';
export type Sex = 'male' | 'female';
export type SizeClass = 'small' | 'medium' | 'large' | 'giant';

export type PetProfile = {
  id: string;
  name: string;
  species: Species;
  breed: string;
  sex: Sex;
  isNeutered: boolean;
  birthDate: string | null;
  currentAgeWeeks: number | null;
  weightKg: number;
  sizeClass: SizeClass | null;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
