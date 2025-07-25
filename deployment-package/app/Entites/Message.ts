export class Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  read: boolean;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.content = data.content;
    this.senderId = data.senderId;
    this.receiverId = data.receiverId;
    this.read = data.read;
    this.createdAt = data.createdAt;
  }

  static async filter(query: any): Promise<Message[]> {
    // Mock implementation - replace with actual API call
    return [];
  }
}
