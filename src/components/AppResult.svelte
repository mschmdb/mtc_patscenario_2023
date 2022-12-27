<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte';

	import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';
	import { storeTableData, storeUserCountries } from '../routes/stores.js';
	import ResultTable from './ResultTable.svelte';

	$: $storeUserCountries, updateTableData();

	// Get Fees based on years (i)

	function getFilingFee(i, filingFee) {
		if (i === 1) {
			return filingFee;
		} else {
			return 0;
		}
	}
	function getExaminationFee(i, examinationFee) {
		if (i === 2) {
			return examinationFee;
		} else {
			return 0;
		}
	}
	function getPublicationFee(i, publicationFee) {
		if (i === 2) {
			return publicationFee;
		} else {
			return 0;
		}
	}
	function getGrantFee(i, grantFee) {
		if (i === 3) {
			return grantFee;
		} else {
			return 0;
		}
	}
	// Get Attorney - Fees

	function getAttorneyFees(
		i,
		uip_complexity,
		uip_basic_fee,
		uip_quick_examination,
		uip_normal_examination,
		uip_extended_examination
	) {
		if (i === 1 && uip_complexity === 'quick') {
			return parseInt(uip_basic_fee, 10) + parseInt(uip_quick_examination, 10);
		} else if (i === 1 && uip_complexity === 'normal') {
			return parseInt(uip_basic_fee, 10) + parseInt(uip_normal_examination, 10);
		} else if (i === 1 && uip_complexity === 'extended') {
			return parseInt(uip_basic_fee, 10) + parseInt(uip_extended_examination, 10);
		} else if (i === 2 && uip_complexity === 'quick') {
			return parseInt(uip_quick_examination, 10);
		} else if (i >= 1 && i <= 3 && uip_complexity === 'normal') {
			return parseInt(uip_normal_examination, 10);
		} else if (i >= 1 && i <= 6 && uip_complexity === 'extended') {
			return parseInt(uip_extended_examination, 10);
		} else {
			return 0;
		}
	}
	// build Array for Table & Charts

	const updateTableData = () => {
		const result = Object.values($storeUserCountries).reduce((acc, item) => {
			acc[item.country_code] = {};

			for (let i = 1; i <= 20; i++) {
				const property = `year_${i}`;
				acc[item.country_code][property] = {
					year: i,
					filing_fee: getFilingFee(i, item.filing_fee),
					examination_fee: getExaminationFee(i, item.examination_fee),
					publication_fee: getPublicationFee(i, item.publication_fee),
					grant_fee: getGrantFee(i, item.grant_fee),
					uip_drawings: item.uip_drawings,
					uip_words: item.uip_words,
					attorney_fee: getAttorneyFees(
						i,
						item.uip_complexity,
						item.uip_basic_fee,
						item.uip_quick_examination,
						item.uip_normal_examination,
						item.uip_extended_examination
					),
					uip_words_claims: item.uip_words_claims,
					uip_translation_fee: item.uip_translation_fee,
					uip_pages: item.uip_pages,
					uip_complexity: item.uip_complexity,
					uip_claims: item.uip_claims,
					uip_multiselect_country_filing_subsequent: item.uip_multiselect_country_filing_subsequent,
					uip_multiselect_country_filing_Lang: item.uip_multiselect_country_filing_Lang,
					country_name: item.country_name,
					country_code: item.country_code,
					maintenance_fee: item[`maintenance_year_${i}`] || 0,
					sum_fee:
						getFilingFee(i, item.filing_fee) +
						getExaminationFee(i, item.examination_fee) +
						getAttorneyFees(
							i,
							item.uip_complexity,
							item.uip_basic_fee,
							item.uip_quick_examination,
							item.uip_normal_examination,
							item.uip_extended_examination
						) +
						getGrantFee(i, item.grant_fee) +
						getPublicationFee(i, item.publication_fee) +
						(item[`maintenance_year_${i}`] || 0)
				};
			}

			return acc;
		}, {});
		// console.log('result:', result);

		$storeTableData = result;
		console.log('storeTableData', $storeTableData);
	};
</script>

<!-- {JSON.stringify($storeTableData)} -->
<ResultTable />
