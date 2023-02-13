export const colors = ['#264653','#2A9D8F','#E9C46A','#F4A261','#E76F51']

export function toNumber(value: any, defaultValue: number) {
	return isNaN(value) ? defaultValue : Number(value)
}

export function hasDuplicates(array: any[]) {
	return ((new Set(array)).size !== array.length)
}
