import { atom } from "recoil";

export const defaultDirectoryState = {
	open: false,
};

export const directoryState = atom({
	key: "directoryState",
	default: defaultDirectoryState,
});
