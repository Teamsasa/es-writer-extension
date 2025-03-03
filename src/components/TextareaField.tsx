import type React from "react";

interface TextareaFieldProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
	label,
	value,
	onChange,
	placeholder,
}) => {
	const id = `textarea-${label.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className="mb-6">
			<label htmlFor={id} className="block text-gray-700 font-medium mb-2">
				{label}
			</label>
			<textarea
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required
				className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-none bg-white"
			/>
		</div>
	);
};
