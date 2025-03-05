import React from "react";

/**
 * 用于输入数字的 hook
 * ```typescript
 * const [numVal, handleChange] = useInputNum("");
 * <input type="number" pattern="[0-9]*" value={numVal} onChange={(e) => handleChange(e.target.value)} />
 * ```
 * @param defaultVal 默认值
 * @returns [numVal, handleChange]
 */
export const useInputNum = (
	defaultVal = "",
): [string, (val: string) => void] => {
	const removeLeadingZeros = (s: string) => {
		const oldLen = s.length;
		let newStr = s.replace(/^0+/, ""); // 移除前导零
		// 全为 0 的情况，留一个 0
		if (newStr.length === 0 && oldLen > 0) {
			newStr = "0";
		}
		return newStr;
	};

	const newDefaultVal = removeLeadingZeros(defaultVal);

	const [numVal, setNumVal] = React.useState(newDefaultVal);

	const handleChange = (val: string) => {
		let newVal = val.replace(/[^\d]/g, "");
		newVal = removeLeadingZeros(newVal);
		setNumVal(newVal);
	};

	return [numVal, handleChange];
};
