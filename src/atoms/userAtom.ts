import { atom } from "recoil";

export type UserAuthenticatedState = {
	authenticated: boolean;
};

export const defaultUserAuthenticatedState: UserAuthenticatedState = {
	authenticated: false,
};

export const userAuthenticatedState = atom<UserAuthenticatedState>({
	key: "userAuthenticatedState",
	default: defaultUserAuthenticatedState,
});
