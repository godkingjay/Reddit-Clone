import { directoryState } from "@/atoms/directoryAtom";
import { useState } from "react";
import { useRecoilState } from "recoil";

const useDirectory = () => {
	const [directoryStateValue, setDirectoryStateValue] =
		useRecoilState(directoryState);

	return {
		directoryOpen: directoryStateValue,
		setDirectoryOpen: setDirectoryStateValue,
	};
};

export default useDirectory;
