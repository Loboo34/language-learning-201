import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  None,
  Some,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Duration,
  Result,
  bool,
  Canister,
} from "azle";
import {
  Ledger,
  binaryAddressFromAddress,
  binaryAddressFromPrincipal,
  hexAddressFromPrincipal,
} from "azle/canisters/ledger";
//import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

const Language = Record({
  id: text,
  name: text,
  duration: text,
  fee: text,
  students: Vec(text),
  teacher: Principal
});

const LanguagePayload = Record({
  name: text,
  duration: text,
  fee: text,
});

const EnrollmentStatus = Variant({
  Pending: text,
  Completed: text,
  Failed: text,
});

const LessonStatus = Variant({
  NotStarted: text,
  InProgress: text,
  Completed: text,
  Dropped: text,
});

const User = Record({
  id: text,
  name: text,
  phoneNo: text,
  email: text,
  paymentMethod: text,
  languageEnrolled: Vec(text),
  enrollmentStatus: EnrollmentStatus,
  LessonProgress: LessonStatus,
  completed: Vec(text),
});

const UserPayload = Record({
  name: text,
  email: text,
  phoneNo: text,
  paymentMethod: text,
});

const Enrollment = Record({
  languageId: text,
  userId: text,
  status: EnrollmentStatus,
});

const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

// Defining Constants and Storage Variables
const languageStorage = StableBTreeMap(0, text, Language);
const userStorage = StableBTreeMap(1, text, User);
const enrollmentStorage = StableBTreeMap(3, text, User);

export default Canister({
  getLanguages: query([], Vec(Language), () => {
    return languageStorage.values();
  }),

  getUsers: query([], Vec(User), () => {
    return userStorage.values();
  }),

  //add language
  addLanguage: update(
    [LanguagePayload],
    Result(Language, Message),
    (payload) => {
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ NotFound: "invalid payoad" });
      }
      const languageId = uuidv4();
      const language = {
        id: languageId,
        students: [],
        teacher: ic.caller(),
        ...payload,
      };

      languageStorage.insert(languageId, language);
      return Ok(language);
    }
  ),

  getLanguage: query([text], Opt(Language), (id) => {
    return languageStorage.get(id);
  }),


  //delete language
  deleteLanguage: update([text], Result(text, Message), (id) => {
    const language = languageStorage.get(id);
    if ("None" in language) {
      return Err({ NotFound: `Language with ID ${id} not found` });
    }
    languageStorage.remove(id);
    return Ok(`Language with ID ${id} deleted`);
  }),

  //add user
  addUser: update([UserPayload], Result(User, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const userId = uuidv4();
    const user = {
      id: userId,
      languageEnrolled: [],
      enrollmentStatus: { Pending: "Pending" },
      LessonProgress: { NotStarted: "NotStarted"},
      completed: [],
      ...payload,
    };
    userStorage.insert(userId, user);
    return Ok(user);
  }),

  getUser: query([text], Opt(User), (id) => {
    return userStorage.get(id);
  }),

  //update user
  updateUser: update([text, UserPayload], Result(User, Message), (id, payload) => {
    const userOpt = userStorage.get(id);
    if ("None" in userOpt) {
      return Err({ NotFound: `User with ID ${id} not found` });
    }
    const user = userOpt.Some;
    userStorage.insert(id, { ...user, ...payload });
    return Ok(user);
  }),

  //delete user
  deleteUser: update([text], Result(text, Message), (id) => {
    const user = userStorage.get(id);
    if ("None" in user) {
      return Err({ NotFound: `User with ID ${id} not found` });
    }
    userStorage.remove(id);
    return Ok(`User with ID ${id} deleted`);
  }),

  //enroll user and update enrollment status, lesson progress and userStorage adding language id to userStorage
  enrollUser: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const userOpt = userStorage.get(userId);
      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = languageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }
      const user = userOpt.Some;
      user.languageEnrolled.push(languageId);
      user.enrollmentStatus = { Completed: "Completed" };
      user.LessonProgress = { InProgress: "InProgress" };

      const language = languageOpt.Some;
      language.students.push(userId);
      userStorage.insert(userId, user);
      languageStorage.insert(languageId, language);
      return Ok(`User ${userId} Enrolled in ${languageId}`);
    }
  ),

  //get users enrolled in a language
  getEnrolledUsers: query([text], Vec(text), (languageId) => {
    const languageOpt = languageStorage.get(languageId);
    if ("None" in languageOpt) {
      return [];
    }
    const language = languageOpt.Some;
    return language.students;
  }),


  unenrollUser: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      // const tUser = ic.caller();
      const userOpt = userStorage.get(userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = languageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }

      const user = userOpt.Some;
      user.languageEnrolled = user.languageEnrolled.filter(
        (id: string) => id !== languageId
      );
      const language = languageOpt.Some;
      language.students = language.students.filter(
        (id: string) => id !== userId
      );

      userStorage.insert(userId, user);
      languageStorage.insert(languageId, language);
      return Ok(`User ${userId} Unenrolled in the language ${languageId}`);
    }
  ),

  //user Completes language and add language id to userStorage(completed)
  completeLanguage: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const userOpt = userStorage.get(userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = languageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }

      const user = userOpt.Some;
      user.completed.push(languageId);
      const language = languageOpt.Some;
      language.students = language.students.filter(
        (id: string) => id !== userId
      );
      userStorage.insert(userId, user);
      languageStorage.insert(languageId, language);
      return Ok(`User ${userId} Completed the language ${languageId}`);
    }
  ),

  //user drops a lesson and update lesson progress
  dropLanguage: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const userOpt = userStorage.get(userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = languageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }

      const user = userOpt.Some;
      user.LessonProgress = { InProgress: "InProgress" };
      const language = languageOpt.Some;
      language.students = language.students.filter(
        (id: string) => id!== userId
      );
      userStorage.insert(userId, user);
      languageStorage.insert(languageId, language);
      return Ok(`User ${userId} dropped the lesson ${languageId}`);
    }
  ),

  //get completed languages
  getCompletedLanguages: query([text], Vec(text), (userId) => {
    const userOpt = userStorage.get(userId);

    if ("None" in userOpt) {
      return [];
    }
    const user = userOpt.Some;
    return user.completed;
  }),

  //get dropped languages
  getDroppedLanguages: query([text], Vec(text), (userId) => {
    const userOpt = userStorage.get(userId);

    if ("None" in userOpt) {
      return [];
    }
    const user = userOpt.Some;
    return user.languageEnrolled;
  }),

  //get user enrollment status
  getEnrollmentStatus: query([text], Opt(text), (userId) => {
    const userOpt = userStorage.get(userId);

    if ("None" in userOpt) {
      return Err({ NotFound: `User with ID ${userId} not found` });
    }
    const user = userOpt.Some;
    return user.enrollmentStatus;
  }),

  

  //pay for course
  payForCourse: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const userOpt = userStorage.get(userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = languageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }

      const user = userOpt.Some;
      //user.paymentMethod = paymentMethode
      const language = languageOpt.Some;
      language.students = language.students.filter(
        (id: string) => id !== userId
      );
      userStorage.insert(userId, user);
      languageStorage.insert(languageId, language);
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
