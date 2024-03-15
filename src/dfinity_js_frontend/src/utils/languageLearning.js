import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createlanguage(language) {
  return window.canister.languageLearning.addLanguage(language);
}

export async function createUser(user) {
  return window.canister.languageLearner.addUser(user);
}

//function to update language
export async function updateLanguage(language) {
  return window.canister.languageLearner.updateLanguage(language);
}

//function to update user
export async function updateUser(user) {
  return window.canister.languageLearner.updateUser(user);
}

//function to get all languages 
export async function getAllLanguages() {
  try {
    return await window.canister.languageLearner.getLanguages();
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
    return await window.canister.languageLearner.getUsers();
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
    return await window.canister.languageLearner.getLanguage(id);
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
    return await window.canister.languageLearner.enrollUser(user);
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
  return window.canister.languageLearner.deleteLanguage(id);
}

//delete user by id
export async function deleteUser(id) {
  return window.canister.languageLearner.deleteUser(id);
}

//unenroll
export async function unenrollUser(id) {
  return window.canister.languageLearner.unenrollUser(id);
}


export async function buyLanguage(event) {
  const languageLearnerCanister = window.canister.languageLearner;
  const orderResponse = await languageLearnerCanister.payForCourse(event.id);
  const sellerPrincipal = Principal.from(orderResponse.Ok.seller);
  const sellerAddress = await languageLearnerCanister.getAddressFromPrincipal(
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
