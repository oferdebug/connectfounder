export class User {
  id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.fullName = data.fullName;
    this.profileImage = data.profileImage;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async me(): Promise<User> {
    // Mock implementation - replace with actual API call
    return new User({
      id: "1",
      email: "founder@example.com",
      fullName: "John Founder",
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async logout(): Promise<void> {
    // Mock implementation - replace with actual logout logic
    console.log("User logged out");
  }
}
