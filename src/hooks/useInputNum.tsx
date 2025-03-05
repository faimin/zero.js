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
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
): [string, (val: string) => void] => {
	const maxLength = `${max}`.length;

	const removeLeadingZeros = (s: string) => {
		const oldLen = s.length;
		let newStr = s.replace(/^0+/, ""); // 移除前导零
		if (oldLen > 0 && newStr.length === 0) {
			newStr = "0";
		}
		if (oldLen > 0) {
			// 超过范围的情况，取 min 或 max
			if (newStr.length > maxLength) {
				newStr = newStr.slice(0, maxLength);
			} else {
				newStr =
					Number.parseInt(newStr) > max
						? max.toString()
						: Number.parseInt(newStr) < min
							? min.toString()
							: newStr;
			}
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
