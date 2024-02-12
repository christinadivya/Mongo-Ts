// dao/UserDAO.ts
import User from "../entity/User";
import { IUser } from "../interfaces/entity/User";

export class UserDAO {
  async createUser(userData: any): Promise<IUser> {
    return await User.create(userData);
  }

  async getUsers(searchTerm: string): Promise<IUser[]> {
    // Create a regular expression pattern for the search term
    const searchRegex = new RegExp(searchTerm, "i"); // 'i' flag for case-insensitive search
    return await User.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { domain: { $regex: searchRegex } },
      ],
    })
      .select("name age email experience domain")
      .sort({ name: "desc" }); // Assuming there's a name field to sort by
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updateUser(id: string, userData: any): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}
