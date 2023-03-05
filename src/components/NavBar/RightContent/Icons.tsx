import DropdownUserMenu from "./Icons/DropdownUserMenu";
import RightContentIcons from "./Icons/RightContentIcons";
import { UserAuth } from "@/pages/_app";

type IconsProps = {
	user?: UserAuth["user"] | null;
};

/**
 *
 *
 * @param {*} { user }
 * @return {*}
 */
const Icons: React.FC<IconsProps> = ({ user }) => {
	return (
		<section className="flex flex-row w-full h-full items-center">
			<RightContentIcons />
			<DropdownUserMenu user={user} />
		</section>
	);
};

export default Icons;
