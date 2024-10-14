"use server";

import mongoose from "mongoose";
import * as Utils from "@/util/utils";
import Expense from "./schemas/Expense.schema";
import connectToDatabase from "@/util/mongoDb";

export const addExpense = async (payload: any) => {
	try {
		await connectToDatabase();
        payload.userId = new mongoose.Types.ObjectId(payload.userId as string);
        payload.categoryId = new mongoose.Types.ObjectId(payload.categoryId as string);

        const newExpense = await Expense.create(payload);

		return { status: "success", data: Utils.cloneJSONObject(newExpense) };
	} catch (err: any) {
		return { status: "error", message: err.message };
	}
};
