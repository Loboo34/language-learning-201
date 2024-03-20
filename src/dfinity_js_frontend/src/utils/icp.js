import { getlanguageLearningCanister, getLedgerCanister } from "./canisterFactory";
import { getAuthClient } from "./auth";

export async function initializeContract() {
    const authClient = await getAuthClient();
    window.auth = {};
    window.canister = {};
    window.auth.client = authClient;
    window.auth.isAuthenticated = await authClient.isAuthenticated();
    window.auth.identity = authClient.getIdentity();
    window.auth.principal = authClient.getIdentity()?.getPrincipal();
    window.auth.principalText = authClient.getIdentity()?.getPrincipal().toText();
    window.canister.languageLearning = await getlanguageLearningCanister();
    window.canister.ledger = await getLedgerCanister();
}