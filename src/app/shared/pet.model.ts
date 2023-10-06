export class PetModel {
  // public id: number;
  // public category?: { id?: number; name?: string };
  // public name: string;
  // public photoUrls?: string[];
  // public tags?: { id?: number; name?: string }[];
  // public status: string;

  constructor(
    public id: number,
    public category: { id: number; name: string },
    public name: string,
    public photoUrls: string[],
    public tags: { id: number; name: string }[],
    public status: string
  ) {
    //   this.id = id;
    //   this.category = category;
    //   this.name = name;
    //   this.photoUrls = photoUrls;
    //   this.tags = tags;
    //   this.status = status;
  }
}
