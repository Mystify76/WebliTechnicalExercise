import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";

@Injectable()
export class ProgramsService {
  constructor(private readonly data: DataService) {}

  async findById(id: string) {
    const found = this.data.programs.find(program => program.id === id);
    return found;
  }

  async findByName(name: string) {
    const found = this.data.programs.filter(program => program.name?.includes(name));
    return found;
  }

  async findProgramsWithHighResidents(min: number, limit: number) {
    const found = this.data.programs.filter(program => (program.attendees ?? []).length >= min);
    found.sort((a, b) => {
      return (a.attendees ?? []).length - (b.attendees ?? []).length;
    });
    return found.slice(0, limit);
  }
}
