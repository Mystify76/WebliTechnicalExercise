import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";
import { User } from "./user.type";

@Injectable()
export class UserService {
  constructor(private readonly data: DataService) {}

  /**
   * Find a specific resident by their userId and return that data as well as the top three recommended programs
   * based on number of people attending and the residents hobbies.
   * @param id
   */
  async findById(id: string) {
    // search for the resident based on id.
    const user = this.data.residents.find(resident => resident.userId === id) as User | undefined;

    // if a resident was found
    if (user) {
      // get the list of programs that match hobbies with the found resident.
      const recommendedPrograms = this.data.programs.filter(program => {
        // if any of the program hobbies are in the users hobbies, then return it.
        if (!user.hobbies) return false;
        return user.hobbies.some(hobby => program.hobbies?.includes(hobby));
      });
      // sort the programs by number of attendees
      recommendedPrograms.sort((a, b) => {
        return (b.attendees ?? []).length - (a.attendees ?? []).length;
      });
      // set the top three
      user.recommendedPrograms = recommendedPrograms.slice(0, 3);
    }
    return user;
  }

  /**
   * get a list of residents based on a partial name search.
   * @param name
   */
  async findByName(name: string) {
    const found = this.data.residents.filter(resident => resident.name?.includes(name));
    return found;
  }

  /**
   * Get the list of all the residents, sorting by name.
   */
  async getAllResidents() {
    const found = [...this.data.residents];
    found.sort((a, b) => {
      return (a.name ?? "").localeCompare(b.name ?? "");
    });
    return found;
  }
}
