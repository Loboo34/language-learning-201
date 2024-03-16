import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  ic,
  nat64,
  Canister,
} from "azle";
import { v4 as uuidv4 } from "uuid";

// Define types

// Define a Language record
const Language = Record({
  id: text,
  name: text,
  duration: text,
  fee: nat64,
  students: Vec(text),
});

// Define a User record
const User = Record({
  id: text,
  name: text,
  email: text,
  paymentMethod: text,
  languageEnrolled: Vec(text),
});

// Define an EnrollmentStatus variant
const EnrollmentStatus = Variant({
  Pending: text,
  Completed: text,
  Failed: text,
});

// Define an Enrollment record
const Enrollment = Record({
  id: text,
  userId: text,
  languageId: text,
  status: EnrollmentStatus,
});

// Define a Message variant for response messages
const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

// Define mappings for storage
const LanguageStorage = StableBTreeMap(0, text, Language);
const UserStorage = StableBTreeMap(1, text, User);
const EnrollmentStorage = StableBTreeMap(2, text, Enrollment);

export default Canister({
  // Query function to get all languages
  getLanguages: query([], Vec(Language), () => {
    return LanguageStorage.values();
  }),

  // Query function to get all users
  getUsers: query([], Vec(User), () => {
    return UserStorage.values();
  }),

  // Update function to add a new language
  addLanguage: update(
    [Record(Language)],
    Result(Language, Message),
    (payload) => {
      const languageId = uuidv4();
      const language = { ...payload, id: languageId, students: [] };
      LanguageStorage.insert(languageId, language);
      return Ok(language);
    }
  ),

  // Query function to get a language by ID
  getLanguage: query([text], Language, (id) => {
    return LanguageStorage.get(id);
  }),

  // Update function to delete a language by ID
  deleteLanguage: update([text], text, (id) => {
    if (!LanguageStorage.contains(id)) {
      return Err({ NotFound: `Language with ID ${id} not found` });
    }
    LanguageStorage.remove(id);
    return Ok(`Language with ID ${id} deleted`);
  }),

  // Update function to add a new user
  addUser: update([Record(User)], Result(User, Message), (payload) => {
    const userId = uuidv4();
    const user = { ...payload, id: userId, languageEnrolled: [] };
    UserStorage.insert(userId, user);
    return Ok(user);
  }),

  // Query function to get a user by ID
  getUser: query([text], User, (id) => {
    return UserStorage.get(id);
  }),

  // Update function to delete a user by ID
  deleteUser: update([text], text, (id) => {
    if (!UserStorage.contains(id)) {
      return Err({ NotFound: `User with ID ${id} not found` });
    }
    UserStorage.remove(id);
    return Ok(`User with ID ${id} deleted`);
  }),

  // Update function to enroll a user in a language
  enrollUser: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const user = UserStorage.get(userId);
      const language = LanguageStorage.get(languageId);

      if (!user || !language) {
        return Err({ NotFound: "User or language not found" });
      }

      user.languageEnrolled.push(languageId);
      language.students.push(userId);

      UserStorage.insert(userId, user);
      LanguageStorage.insert(languageId, language);

      return Ok(`Enrolled user ${userId} in language ${languageId}`);
    }
  ),

  // Query function to get languages enrolled by a user
  getEnrolledLanguages: query([text], Vec(text), (userId) => {
    const user = UserStorage.get(userId);
    return user ? user.languageEnrolled : [];
  }),

  // Query function to get users enrolled in a language
  getEnrolledUsers: query([text], Vec(text), (languageId) => {
    const language = LanguageStorage.get(languageId);
    return language ? language.students : [];
  }),

  // Query function to get languages with users enrolled
  getLanguagesWithUsers: query([], Vec(Language), () => {
    return LanguageStorage.values().map((language) => {
      return {
        ...language,
        students: language.students.map((userId) =>
          UserStorage.get(userId)
        ),
      };
    });
  }),

  // Update function to unenroll a user from a language
  unenrollUser: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const user = UserStorage.get(userId);
      const language = LanguageStorage.get(languageId);

      if (!user || !language) {
        return Err({ NotFound: "User or language not found" });
      }

      user.languageEnrolled = user.languageEnrolled.filter(
        (id) => id !== languageId
      );
      language.students = language.students.filter((id) => id !== userId);

      UserStorage.insert(userId, user);
      LanguageStorage.insert(languageId, language);

      return Ok(`Unenrolled user ${userId} from language ${languageId}`);
    }
  ),

 payForCourse: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      // const tUser = ic.caller();
      const userOpt = UserStorage.get(userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = LanguageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }

      const user = userOpt.Some;
      //user.paymentMethod = paymentMethode
      const language = languageOpt.Some;
      language.students = language.students.filter(
        (id: string) => id !== userId
      );
      UserStorage.insert(userId, user);
      LanguageStorage.insert(languageId, language);
      return Ok(`Paypal Payment Completed`);
    }
  ),
});

// a workaround to make uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
