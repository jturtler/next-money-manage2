import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";


export default function PieChart1({ chartData, categories }: { chartData: any, categories: any[] }) {

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Expenses Distribution',
			},
		},
	};

	return (
		<div className="flex items-center">
			<div className="w-full max-w-[500px]"> {/* Adjust max-width as needed */}
				<ResponsiveContainer width={400} height={400}>
					<PieChart>
						<Pie
							data={chartData}
							nameKey="categoryName"
							dataKey="total"
							cx={200}
							cy={200}
							label
						>
							{chartData.map((entry: any, index: number) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Category List - Place in the second column */}
			<div className="flex flex-col items-start justify-between">
				{categories!.map((category, idx) => (
					<div className="flex flex-row m-1 items-center justify-between" key={category._id}>
						<div style={{ backgroundColor: category.color }} className="w-4 h-4 rounded-full"></div>
						<div className="px-3 text-right whitespace-nowrap">{category.name}</div>
					</div>
				))}
			</div>

		</div>
	);
};