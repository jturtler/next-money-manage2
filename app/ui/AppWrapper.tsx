import { useEffect, useState } from "react";
import SpinningIcon from "./common/SpinningIcon";
import * as Utils from "@/util/utils";
import { useContextNavChoice } from "@/context/ContextNavChoice";
import DataDisplay from "./pages/DataDisplay";
import PieChartDisplay from "./pages/PieChartDisplay";
import ExpenseForm from "./ExpenseForm";

export default function AppWrapper() {
	
	const [loading, setLoading] = useState<boolean>(true); // Loading state
	const [dataList, setDataList] = useState<any[]>([]); // Loading data
	const { navChoice, setNavChoice } = useContextNavChoice();

	useEffect( () => {
		onDataRequest();
	}, []); // Only if 'symbol' is not same as previous one, run 'useEffect'

	const onDataRequest = async () => {

		const response: any = await fetch('/api/expense?userId=66c87d3411b974f022f84bec');
		const responseJson: any[] = await response.json();

		// OPTOINAL?  Reverse the order..
		const sortedArr = Utils.sortArrayByDate(responseJson);
console.log(sortedArr);
		setDataList( sortedArr);
		setLoading(false);
	};

	const addExpense = (newExpense: any) => {
		const list = Utils.cloneJSONObject(dataList);
		list.push(newExpense);
		
		const sortedArr = Utils.sortArrayByDate(list);
		setDataList(sortedArr);
	} 

	// 1. Download the data on load <-- on 'useEffect'.. unless it is refreshed by button - state?
	// 2. loading progress tag
	// 3. Display items --> in diff container <-- switch in here..  'state' value of display selection..

	return (
		<div className="bg-gray-100 p-2 text-black">
			{ ( loading ) ?
				<div className="ml-2 mt-1 w-fit">
					<SpinningIcon className="text-gray-400" />
				</div>
				:<>
				{ navChoice === 'Home' && <DataDisplay dataList={dataList} /> }
				{ navChoice === 'PieChart' && <PieChartDisplay dataList={dataList} /> }
				{ navChoice === 'AddExpense' && <ExpenseForm onSaveSuccess={(newExpense) => addExpense(newExpense)} /> }
				</>
			}
		</div>
	);
};