import { writable, derived } from 'svelte/store';

export const chosencountries = writable(0);
export const storeTableData = writable([]);
export const storeUserVal = writable(0);
export const storeUserCho = writable([]);
export const supaData = writable([]);
export const storeShowEdit = writable();
export const storeShowResult = writable();
export const storeUserCountries = writable([]);
//We calculate the stored Chart Data
export const storeChartData = derived([storeTableData], ([storeTableData]) => {
	const chart = [];

	const countriesArray = Object.entries(storeTableData);

	countriesArray.forEach(([countryCode, countryObject]) => {
		const yearsArray = Object.entries(countryObject);

		const countryChart = yearsArray.flatMap(([year, feeObject]) => {
			return [
				{
					group: feeObject.country_code + ' - Maintenance',
					key: feeObject.year,
					value: feeObject.maintenance_fee
				},
				{
					group: feeObject.country_code + ' - Filing Fee',
					key: feeObject.year,
					value: feeObject.filing_fee
				},
				{
					group: feeObject.country_code + ' - Attorney Fee',
					key: feeObject.year,
					value: feeObject.attorney_fee
				},
				{
					group: feeObject.country_code + ' - Grant Fee',
					key: feeObject.year,
					value: feeObject.grant_fee
				},
				{
					group: feeObject.country_code + ' - Publication Fee',
					key: feeObject.year,
					value: feeObject.publication_fee
				},
				{
					group: feeObject.country_code + ' - Examination Fee',
					key: feeObject.year,
					value: feeObject.examination_fee
				},
				{
					group: feeObject.country_code + ' - Translation Fee',
					key: feeObject.year,
					value: feeObject.translation_fee
				}
			];
		});

		chart.push(...countryChart);
	});

	return chart;
});
