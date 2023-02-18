import { atom } from "recoil";

export interface CommunityModalState {
	open: boolean;
	view: "create";
}

const defaultModalState: CommunityModalState = {
	open: false,
	view: "create",
};

export const communityModalState = atom<CommunityModalState>({
	key: "communityModalState",
	default: defaultModalState,
});
