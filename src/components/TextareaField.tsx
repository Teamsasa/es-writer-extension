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
		<div className="w-full mb-6">
			<label
				htmlFor={id}
				className="block text-sm font-medium mb-1 ml-0.5 dark:text-darkmode-text-primary"
			>
				{label}
			</label>
			<textarea
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required
				rows={4}
				className="w-full px-3 py-2 bg-white dark:bg-darkmode-paper border border-gray-300 dark:border-darkmode-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main dark:focus:ring-primary-light focus:border-primary-main dark:focus:border-primary-light transition-colors dark:text-darkmode-text-primary dark:placeholder-darkmode-text-secondary/70"
			/>
		</div>
	);
};
