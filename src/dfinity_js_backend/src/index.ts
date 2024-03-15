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
  fee: nat64,
  students: Vec(text),
});

const LanguagePayload = Record({
  name: text,
  duration: text,
  fee: nat64,
});

 const Role = Variant({
   Admin: text,
   User: text,
 });

const User = Record({
  id: text,
  name: text,
  email: text,
  paymentMethod: text,
  languageEnrolled: Vec(text),
 // role: Opt(Role),
});

const UserPayload = Record({
  name: text,
  email: text,
  paymentMethod: text,

});

const EnrollmentStatus = Variant({
  Pending: text,
  Completed: text,
  Failed: text,
});

const Enrollment = Record({
  id: text,
  userId: text,
  languageId: text,
  status: EnrollmentStatus,
});

const EnrollmentPayload = Record({
  userId: text,
  languageId: text,
});

const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  //PaymentFailed: text,
  //PaymentCompleted: text,
});

// Defining Constants and Storage Variables
const LanguageStorage = StableBTreeMap(0, text, Language);
const UserStorage = StableBTreeMap(1, text, User);
const enrollmentStorage = StableBTreeMap(3, text, User);

export default Canister({
  getLanguages: query([], Vec(Language), () => {
    return LanguageStorage.values();
  }),

  getUsers: query([], Vec(User), () => {
    return UserStorage.values();
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
        name: payload.name,
        duration: payload.duration,
        fee: payload.fee,
        students: [],
      };

      LanguageStorage.insert(languageId, language);
      return Ok(language);
    }
  ),

  getLanguage: query([text], Opt(Language), (id) => {
    return LanguageStorage.get(id);
  }),

  //delete language
  deleteLanguage: update(
    [text],
    Result(text, Message),
    (id) => {
      const language = LanguageStorage.get(id);
      if ("None" in language) {
        return Err({ NotFound: `Language with ID ${id} not found` });
      }
      LanguageStorage.remove(id); 
      return Ok(`Language with ID ${id} deleted`);
     
    }
  ),

  //add user
  addUser: update([UserPayload], Result(User, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }

    const userId = uuidv4();

    const user = {
      id: userId,
      name: payload.name,
      email: payload.email,
     // role: ,
      paymentMethod: payload.paymentMethod,
      languageEnrolled: [],
    };

    UserStorage.insert(userId, user);
    return Ok(user);
  }),

  getUser: query([text], Opt(User), (id) => {
    return UserStorage.get(id);
  }),

  //delete user
  deleteUser: update([text], Result(text, Message), (id) => {
    const user = UserStorage.get(id);
    if ("None" in user) {
      return Err({ NotFound: `User with ID ${id} not found` });
    }
    UserStorage.remove(id);
    return Ok(`User with ID ${id} deleted`);
  }),

  //enroll user and update userStorage adding language id to userStorage
  enrollUser: update(
    [text, text],
    Result(text, Message),
    (userId, languageId) => {
      const tUser = ic.caller();
      const userOpt = UserStorage.get(userId);

      if ("None" in userOpt) {
        return Err({ NotFound: `User with ID ${userId} not found` });
      }
      const languageOpt = LanguageStorage.get(languageId);
      if ("None" in languageOpt) {
        return Err({ NotFound: `Language with ID ${languageId} not found` });
      }
      const user = userOpt.Some;
      user.languageEnrolled.push(languageId);
      const language = languageOpt.Some;
      language.students.push(userId);



      UserStorage.insert(userId, user);
      LanguageStorage.insert(languageId, language);
      return Ok(`Enrolled in course ${languageId}`);
      //return user details
      return Ok(user);

      


    }
  ),

  //get name language user is currently enrolled in
  getEnrolledLanguages: query([text], Vec(text), (userId) => {
    const userOpt = UserStorage.get(userId);
    if ("None" in userOpt) {
      return [];
    }
    const user = userOpt.Some;
    return user.languageEnrolled;
  }),

  //get users enrolled in a language
  getEnrolledUsers: query([text], Vec(text), (languageId) => {
    const languageOpt = LanguageStorage.get(languageId);
    if ("None" in languageOpt) {
      return [];
    }
    const language = languageOpt.Some;
    return language.students;
  }),

  //get languages with users enrolled in them and their details
  getLanguagesWithUsers: query([], Vec(Language), () => {
    return LanguageStorage.values().map((language) => {
      return {
        ...language,
        students: language.students.map((userId: any) => {
          const user = UserStorage.get(userId);
          return user;
        }),
      };
    });
  }),

  //remove language id from userStorage
  unenrollUser: update(
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
      user.languageEnrolled = user.languageEnrolled.filter(
        (id: string) => id !== languageId
      );
      const language = languageOpt.Some;
      language.students = language.students.filter(
        (id: string) => id !== userId
      );

      UserStorage.insert(userId, user);
      LanguageStorage.insert(languageId, language);
      return Ok(`User Unenrolled in course ${languageId}`);
    }
  ),


  //pay for course
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
        (id: string) => id!== userId
      );
      UserStorage.insert(userId, user);
      LanguageStorage.insert(languageId, language);
      return Ok(`Paypal Payment Completed`);
    }
  ),




//   userEnroll: update(
//     [EnrollmentPayload],
//     Result(text, Message),
    
//     (payload) => {
//       const user = UserStorage.get(payload);
//       const language = LanguageStorage.get(payload.languageId);
//       if ("None" in user) {
//         return Err({ NotFound: "User not found" });
//       }
//       if ("None" in language) {
//         return Err({ NotFound: "Language not found" });
//       }
//       const enroll = {
//         id: uuidv4(),
//         userId: payload.userId,
//         languageId: payload.languageId,
//         status: { Pending: "Pending" },
//       };

      
      


//       enrollmentStorage.insert(enroll.id, enroll);
//       UserStorage.insert(payload.userId, user);
//       LanguageStorage.insert(payload.languageId, language);

// //add language id to user storage
//       const tUser = user.Some;
//       tUser.languageEnrolled.push(payload.languageId);
     

      
//       return Ok("Enrollment successful");
//     }
//   ),'



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
    }
};
