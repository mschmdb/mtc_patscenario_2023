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
	import { Result, User } from 'carbon-icons-svelte';
	import { children } from 'svelte/internal';
	import { chosencountries, storeTableData, storeUserCho, supaData, storeUserCountries } from '../routes/stores.js';


	console.log($storeUserCountries)
	// build Array for Table & Charts
	$: result = []
if ($storeUserCountries) {
	result = Object.values($storeUserCountries).reduce((acc, item) => {
		acc[item.country_code] = {};

		for (let i = 1; i <= 20; i++) {
			const property = `maintenance_year_0${i}`;
			acc[item.country_code][property] = {
				year: i,
				drawings: item.uip_drawings,
				complexity: item.uip_complexity,
				language: item.uip_multiselect_country_filing_Lang,
				country: item.country_name,
				country_code: item.country_code,
				maintenance: item[`maintenance_year_${i}`] || 0
				
			};
		}
		
		return acc;
	}, {});
}
	$: storeTableData.set(result)
	console.log("uhmja",result);
</script>
ddfsfddd
<!-- <div>ddks fsdlfa kdöasfldk ajöfsldk föasd<br /><br />poid fpiogjsp dfiogjp fsgi fdpfgiod</div> -->
<br>RESULT:
{JSON.stringify(result)}