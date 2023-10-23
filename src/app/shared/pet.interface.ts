// export interface PetInterface {
//   id: number;
//   category: { id: number; name: string };
//   name: string;
//   photoUrls: string[];
//   tags: { id: number; name: string }[];
//   status: string;
// }

export interface PetInterface {
  id: number;
  category: PetCategory;
  name: string;
  photoUrls: string[];
  tags: PetTag[];
  status: string;
}

export interface PetCategory {
  id: number;
  name: string;
}

export interface PetTag {
  id: number;
  name: string;
}
