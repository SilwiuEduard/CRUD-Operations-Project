export interface PetInterface {
  id: any;
  category: {
    id: any;
    name: String;
  };
  name: string;
  photoUrls: [String];
  tags: [
    {
      id: any;
      name: String;
    }
  ];
  status: String;
}
// === FIRST VERSION of Interface ===
// export interface PetInterface {
//   id: number;
//   category: PetCategory;
//   name: string;
//   photoUrls: string[];
//   tags: PetTag[];
//   status: string;
// }

// export interface PetCategory {
//   id: number;
//   name: string;
// }

// export interface PetTag {
//   id: number;
//   name: string;
// }

// === API SERVER - RESPONSE ===

// {
//   "id": 0,
//   "category": {
//     "id": 0,
//     "name": "string"
//   },
//   "name": "doggie",
//   "photoUrls": [
//     "string"
//   ],
//   "tags": [
//     {
//       "id": 0,
//       "name": "string"
//     }
//   ],
//   "status": "available"
// }
