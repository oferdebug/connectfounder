export class Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  type: string;
  capacity?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.date = data.date;
    this.location = data.location;
    this.type = data.type;
    this.capacity = data.capacity;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async list(orderBy: string, limit: number): Promise<Event[]> {
    // Mock implementation - replace with actual API call
    return [];
  }
}
