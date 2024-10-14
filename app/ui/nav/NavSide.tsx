import { useContextNavChoice } from "@/context/ContextNavChoice";
import { FaHome, FaChartPie } from "react-icons/fa";
import { TbLayoutNavbarFilled } from "react-icons/tb";
import { IoHomeSharp } from "react-icons/io5";
import { useContextNavDirection } from "@/context/ContextNavDirection";
import { BiSolidAddToQueue } from "react-icons/bi";

export default function NavSide() {

	const { navChoice, setNavChoice } = useContextNavChoice();
	const { navDirection, setNavDirection } = useContextNavDirection();

	const getCssChoiceStr = ( navStr: string ) => {
		return ( navStr === navChoice ) ? 'text-blue-700': '';
	};

	return (
		<>
		{ (navDirection === 'LeftSide') &&
		<div className="w-8 bg-gray-900 text-white p-2 flex flex-col gap-3">
			<div className={ "cursor-pointer " + getCssChoiceStr( 'Home' ) } title="Home" onClick={() => setNavChoice('Home')}><IoHomeSharp  /></div>
			<div className={ "cursor-pointer " + getCssChoiceStr( 'PieChart' ) } title="Pie Chart" onClick={() => setNavChoice('PieChart')}><FaChartPie /></div>
			<div className={ "cursor-pointer " + getCssChoiceStr( 'AddExpense' ) } title="Add Expense" onClick={() => setNavChoice('AddExpense')}><BiSolidAddToQueue /></div>
			<div className="mt-2 cursor-pointer" title="Switch Nav Position To Top" onClick={() => setNavDirection('Top')}><TbLayoutNavbarFilled /></div>
	   </div>
		}
		</>
	);
};