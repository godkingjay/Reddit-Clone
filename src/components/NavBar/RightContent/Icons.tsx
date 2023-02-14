import DropdownUserMenu from "./Icons/DropdownUserMenu";

type IconsProps = {};

const Icons: React.FC<IconsProps> = () => {
	return (
		<section className="flex flex-row w-full h-full items-center">
			<DropdownUserMenu />
		</section>
	);
};

export default Icons;
