import { useEffect, useState } from "react";
import * as dbService from "@/lib/mongodb";
import SpinningIcon from "../common/SpinningIcon";
import * as Utils from "@/util/utils";
import PieChart1 from "../items/PieChart1";
import PieChart2 from "../items/PieChart2";

export default function PeiChartDisplay({ dataList }: { dataList: any[] }) {

	const [displayType, setDisplayType] = useState('Chart2'); // Loading state
	const [categories, setCategories] = useState<any | null>(null);
	const [errMsg, setErrMsg] = useState<string>("");

    const fetchCategories = async() => {
		const response = await dbService.fetchCategories();
		if( response.status == "success" ) {
			setCategories( response.data );
		}
		else {
			setErrMsg(response.message);
		}
    }

	useEffect(() => {
		fetchCategories();
	}, []);

	
	const transformedData = dataList.reduce((acc: any[], expense: any) => {
		const { categoryId, amount } = expense;
		const category = Utils.findItemFromList(categories!, categoryId, "_id")!;
		if( category !== null) {
			const existingCategory = acc.find(item => item.categoryName === category.name);
			if (existingCategory) {
				existingCategory.total += amount;
			} else {
				acc.push({ categoryName: category.name, total: amount, color: category.color });
			}
		}
	
		return acc;
	}, []) as any[];

	const displayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDisplayType(event.target.value);
	};

	if( categories === null ) return (<div><SpinningIcon /></div>);

	if( errMsg !== "" ) return (<div>{errMsg}</div>);

	return (
		<div className="ml-2 mt-1 text-sm">
			<div className="w-full flex justify-end" >
				<div className="w-fit" >
					<label className="text-xs" htmlFor="dropdown">Display:</label>
					<select id="dropdown" className="ml-1 text-xs p-1" value={displayType} onChange={displayChange}>
						<option value="Chart2">Chart2</option>
						<option value="Chart1">Chart1</option>
					</select>
				</div>
			</div>
			<div className="mt-2">
				{displayType === 'Chart1' && <PieChart1 chartData={transformedData} categories={categories}></PieChart1>}
				{displayType === 'Chart2' && <PieChart2></PieChart2>}
			</div>
		</div>
	);
};