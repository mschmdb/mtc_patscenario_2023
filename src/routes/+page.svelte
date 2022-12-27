<script lang="ts">
	import 'carbon-components-svelte/css/g10.css';
	import { Button } from 'carbon-components-svelte';
	import {
		chosencountries,
		storeTableData,
		storeUserVal,
		storeUserCho,
		supaData,
		storeUserCountries
	} from './stores';
	import AppResult from '../components/AppResult.svelte';
	import AppForm from '../components/AppForm.svelte';
	import type { ActionData, PageData } from './$types';
	import { CodeSigningService } from 'carbon-icons-svelte';

	//Fetch Data
	export let data;
	export let form: ActionData;
	$: storeUserCho.set(form?.userChosen);
	$: supaData.set(data);
	$: editForm = true;
	$: showResults = false;
	console.log($storeUserCho);
	console.log(data);
	//Convert Data
	$: values = Object.values(data);
	// console.log(values);
	let countries = values;
	let userval = '';
	//Show Results?

	// Split the uip_multiselect_country_filing property into an array of country codes
	$: dataArray = Object.values(data);

	// Split the uip_multiselect_country_filing property into an array of country codes
	$: filingCountries = $storeUserCho?.uip_multiselect_country_filing?.split(',');

	// Filter the dataArray to include only countries with a code that is included in filingCountries
	$: filteredCountries = dataArray.filter((country) => {
		return filingCountries?.includes(country.country_code);
	});
	// Add the properties of $storeUserVal to filteredCountries
	$: filteredCountriesCombined = filteredCountries.map((country) => {
		return Object.assign({}, country, $storeUserCho);
	});
	$: storeUserCountries.set(filteredCountriesCombined);
		
</script>

<div class="container m-8">
	<h1 class="text-2xl">Patscenariopp</h1>
	<AppForm bind:form />
	{#if editForm}
		<!-- {JSON.stringify(form)}<br> -->
		showresults: {showResults}<br />
		storeusercountries: {JSON.stringify($storeUserCountries)}<br />
		<!-- {JSON.stringify($storeUserCho)}<br /> -->
		<!-- UIP PAGES: {($storeUserCho || {}).uip_pages}<br /> -->
		<!-- Filing: {filingCountries} -->
		<!-- combined data: {JSON.stringify(filteredCountriesCombined)} -->
	{/if}
	{#if $storeUserCho}
		<AppResult />
		<br />
		<Button on:click={() => ((editForm = true), (showResults = false))}>Edit Results</Button>
	{/if}
</div>
