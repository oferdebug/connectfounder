export class Connection {
  id: string;
  founderAId: string;
  founderBId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.founderAId = data.founderAId;
    this.founderBId = data.founderBId;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async filter(query: any): Promise<Connection[]> {
    // Mock implementation - replace with actual API call
    return [];
  }
}
