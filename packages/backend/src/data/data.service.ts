import { Injectable } from "@nestjs/common";
import rawData from "./backend.json";
import { Programs, Residents } from "../app.interface";

@Injectable()
export class DataService {
  residents: Residents[];
  programs: Programs[];

  constructor() {
    const raw = rawData; // just so the IDE debugger will display the data.

    // this function is used to convert specific properties from string to string arrays.
    const reviver = (key, value) => {
      if (!value) return value;
      // split string array properties into actual arrays.
      if (key === "hobbies" || key === "dimensions" || key === "facilitators" || key === "levelsOfCare") return value.split(",");
      // map the attendees to a string array single the userId is the only property.
      if (key === "attendees") return value.map(attendee => attendee.userId);
      return value;
    };

    // why am I stringify'ing and then parsing the json file again when it actually gets imported as json?
    // well, I have a helper function that will convert dates to actual dates when the JSON.parse is used.
    // Also, we can use the reviver to convert string array's to actual arrays.
    // Importing the rawData above ensures the json file is included in the dist folder.
    const stringified = JSON.stringify(raw);
    const json = JSON.parse(stringified, reviver, true);

    this.residents = json.residents;
    this.programs = json.programs;
  }
}
