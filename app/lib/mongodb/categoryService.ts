"use server";

import connectToDatabase from "@/util/mongoDb";
import Category from "./schemas/Category.schema";

import * as Utils from "@/util/utils";

export const fetchCategories = async () => {
	try {
		await connectToDatabase();
		const categoryList = await Category.find();

		return { status: "success", data: Utils.converDbObjectToJson(categoryList) };
	} catch (err: any) {
		console.log(err);
		return { status: "error", message: err.message };
	}
};
