import { useContextNavChoice } from "@/context/ContextNavChoice";
import { FaHome, FaChartPie } from "react-icons/fa";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { IoHomeSharp } from "react-icons/io5";
import { useContextNavDirection } from "@/context/ContextNavDirection";
import { BiSolidAddToQueue } from "react-icons/bi";

export default function NavTop() {

	const { navChoice, setNavChoice } = useContextNavChoice();
	const { navDirection, setNavDirection } = useContextNavDirection();

	const getCssChoiceStr = ( navStr: string ) => {
		return ( navStr === navChoice ) ? 'text-blue-700': '';
	};

	return ( 
		<>
		 { (navDirection === 'Top') && 
		 		<div className="w-full bg-gray-900 text-white p-1 mt-1 pl-2 flex gap-3">
				 <div className={ "cursor-pointer flex " + getCssChoiceStr( 'Home' ) } title="Home" onClick={() => setNavChoice('Home')}> <div><IoHomeSharp  /></div> <div className="ml-1 text-xs">Home</div> </div>
				 <div className={ "cursor-pointer  flex " + getCssChoiceStr( 'PieChart' ) } title="Pie Chart" onClick={() => setNavChoice('PieChart')}> <div><FaChartPie /></div> <div className="ml-1 text-xs">Pie Chart</div> </div>
				 <div className={ "cursor-pointer " + getCssChoiceStr( 'AddExpense' ) } title="Add Expense" onClick={() => setNavChoice('AddExpense')}><BiSolidAddToQueue /></div>
				 <div className="cursor-pointer" title="Switch Nav Position to Left" onClick={() => setNavDirection('LeftSide')}><TbLayoutSidebarFilled /></div>
			 </div>	 
		 }
		</>
	);
};