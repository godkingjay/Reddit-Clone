import DropdownUserMenu from "./Icons/DropdownUserMenu";
import RightContentIcons from "./Icons/RightContentIcons";

type IconsProps = {};

const Icons: React.FC<IconsProps> = () => {
	return (
		<section className="flex flex-row w-full h-full items-center">
			<RightContentIcons />
			<DropdownUserMenu />
		</section>
	);
};

export default Icons;
