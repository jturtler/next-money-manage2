"use client";

import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import Alert from './common/Alert';
import * as Utils from "@/util/utils";
import * as dbService from "@/lib/mongodb";
import DateField from './common/DateField';


const userId = "66c87d3411b974f022f84bec";

export default function ExpenseForm({onSaveSuccess}: {onSaveSuccess: (newExpense: any) => void}) {

	const [expense, setExpense] = useState<any>({});
	const [categories, setCategories] = useState<any | null>(null);
	const [alertMsg, setAlertMsg] = useState<any>({});

    const fetchCategories = async() => {
		const response = await dbService.fetchCategories();
		if( response.status == "success" ) {
			setCategories( response.data );
		}
		else {
			setAlertMsg({type:"error", message: response.message});
		}
    }

	useEffect(() => {
		fetchCategories();
	}, []);

	const setValue = (propName: string, value: string | Date | null) => {
		setAlertMsg({});

		var tempData = Utils.cloneJSONObject(expense);
		if (value == null || value == "") {
			delete tempData[propName];
		}
		else if (value instanceof Date) {
			tempData[propName] = Utils.formatDateObjToDbDate(value);
		}
		else {
			tempData[propName] = value;
		}

		setExpense(tempData);
	}

	const handleOnSave = async(event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (checkValidation()) {
			expense.userId = userId;

			const response = await dbService.addExpense(expense);
			if( response.status == "success" ) {
				setAlertMsg({type: "success", message: "The data is saved !"});
				
				onSaveSuccess(response.data);
			}
			else {
				setAlertMsg({type:"error", message: response.message});
			}
		}
		else {
			setAlertMsg({type: "error", message: "Please check red fields."});
		}
	};

	const checkValidation = () => {
		return (expense.categoryId === undefined
			|| expense.amount === undefined
			|| expense.date === undefined
		) ? false : true;
	}


	return (
		<>
			<div className="overflow-x-auto bg-background-color bg-white">
				{alertMsg.message !== undefined && <Alert type={alertMsg.type} message={alertMsg.message} />}

				<div className="flex items-center justify-center">
					<div className="flex-1 px-3 my-2 py-2 rounded border border-gray-300 max-w-xl">
						<div className="text-2xl mt-3 mb-5">Add A New Expense</div>
						
						<div>
							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="amount">
									Amount <span className="text-red-600 ml-1">*</span>
								</label>
								<input
									type="number"
									id="amount"
									value={expense.amount}
									onChange={(e) => setValue("amount", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
									required
								/>
								{(expense.amount == undefined || expense.amount == "") && <><br /><span className="text-sm italic text-red-600 ml-1">* This field is required</span></>}
							</div>

							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="category">
									Category <span className="text-red-600 ml-1">*</span>
								</label>
								<select
									id="categoryId"
									onChange={(e) => setValue("categoryId", e.target.value)}
									value={expense.categoryId}
									className="w-full p-2 border border-gray-300 rounded"
								>
									<option value="">[Please select]</option>
									{categories && categories?.map((category: any) => (
										<option key={category._id} value={category._id}>{category.name}</option>
									))}
								</select>
								{(expense.categoryId == undefined || expense.categoryId == "") && <><br /><span className="text-sm italic text-red-600 ml-1">* This field is required</span></>}
							</div>

							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="date">
									Date <span className="text-red-600 ml-1">*</span>
								</label>
								<DateField
									id="date"
									value={expense.date}
									handleOnChange={(date) => setValue("date", date)}
									className="w-full p-2 border border-gray-300 rounded"
								/>
								{(expense.date == undefined || expense.date == "") && <><br /><span className="text-sm italic text-red-600 ml-1">* This field is required</span></>}
							</div>

							<div className="mb-2">
								<label className="block text-gray-700 mb-2" htmlFor="description">
									Description
								</label>
								<textarea
									id="description"
									value={expense.description}
									onChange={(e) => setValue("description", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>

							<div className="grid grid-cols-2 gap-x-3">
								<button
									type="submit"
									className="bg-mint-green px-4 py-2 rounded hover:bg-green-300"
									onClick={(e) => handleOnSave(e)}
								>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
