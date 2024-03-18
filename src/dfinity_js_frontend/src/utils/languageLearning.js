import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createlanguage(language) {
  return window.canister.languageLearning.addLanguage(language);
}

export async function createUser(user) {
  return window.canister.languageLearning.addUser(user);
}

//function to update language
export async function updateLanguage(language) {
  return window.canister.languageLearning.updateLanguage(language);
}

//function to update user
export async function updateUser(user) {
  return window.canister.languageLearning.updateUser(user);
}

//function to get all languages 
export async function getAllLanguages() {
  try {
    return await window.canister.languageLearning.getLanguages();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//function to get all users 
export async function getAllUsers() {
  try {
    return await window.canister.languageLearning.getUsers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//function to get language by id 
export async function getLanguageById(id) {
  try {
    return await window.canister.languageLearning.getLanguage(id);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//function to enroll user in language
export async function enrollUser(user) {
  try {
    return await window.canister.languageLearning.enrollUser(user);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get enrolled users
export async function getEnrolledUsers() {
  try {
    return await window.canister.languageLearning.getEnrolledUsers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}



//delete language by id
export async function deleteLanguage(id) {
  return window.canister.languageLearning.deleteLanguage(id);
}

//delete user by id
export async function deleteUser(id) {
  return window.canister.languageLearning.deleteUser(id);
}

//unenroll
export async function unenrollUser(id) {
  return window.canister.languageLearning.unenrollUser(id);
}

//complete language
export async function completeLanguage(id) {
  return window.canister.languageLearning.completeLanguage(id);
}

//drop language
export async function dropLanguage(id) {
  return window.canister.languageLearning.dropLanguage(id);
}

//get completed language
export async function getCompletedLanguages() {
  try {
    return await window.canister.languageLearning.getCompletedLanguages();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get dropped languages
export async function getDroppedLanguages() {
  try {
    return await window.canister.languageLearning.getDroppedLanguages();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}



export async function buyLanguage(event) {
  const languageLearningCanister = window.canister.languageLearning;
  const orderResponse = await languageLearningCanister.payForCourse(event.id);
  const sellerPrincipal = Principal.from(orderResponse.Ok.seller);
  const sellerAddress = await languageLearningCanister.getAddressFromPrincipal(
    sellerPrincipal
  );
  const block = await transferICP(
    sellerAddress,
    orderResponse.Ok.price,
    orderResponse.Ok.memo
  );
  await eventManagerCanister.completePurchase(
    sellerPrincipal,
    language.id,
    orderResponse.Ok.price,
    block,
    orderResponse.Ok.memo
  );
}
