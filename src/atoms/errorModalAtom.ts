import { atom } from "recoil";

export interface ErrorModalState {
	open: boolean;
	view: "file-upload";
}

const defaultModalState: ErrorModalState = {
	open: false,
	view: "file-upload",
};

export const errorModalState = atom<ErrorModalState>({
	key: "errorModalState",
	default: defaultModalState,
});
