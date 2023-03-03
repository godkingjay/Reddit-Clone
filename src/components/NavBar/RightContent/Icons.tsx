import { User } from "firebase/auth";
import DropdownUserMenu from "./Icons/DropdownUserMenu";
import RightContentIcons from "./Icons/RightContentIcons";

type IconsProps = {
	user?: User | null;
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
