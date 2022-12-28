<script lang="ts">
  import { fade, fly } from 'svelte/transition';
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte';
	

	
	import { User } from 'carbon-icons-svelte';
	import { children } from 'svelte/internal';
	import { chosencountries, storeTableData, storeUserCho } from '../routes/stores.js';
	const tableData = Object.values($storeTableData);
  let sum_year_1 = 0
  let sum_year_2 = 0
  let sum_year_3 = 0
  let sum_year_4 = 0
  let sum_year_5 = 0
  let sum_year_6 = 0
  let sum_year_7 = 0
  let sum_year_8 = 0
  let sum_year_9 = 0
  let sum_year_10 = 0
  let sum_year_11 = 0
  let sum_year_12 = 0
  let sum_year_13 = 0
  let sum_year_14 = 0
  let sum_year_15 = 0
  let sum_year_16 = 0
  let sum_year_17 = 0
  let sum_year_18 = 0
  let sum_year_19 = 0
  let sum_year_20 = 0
	console.log('in component', $storeTableData);

  // get attourneycosts from complexity
	let attorneyfeeval = 0;
	if ($storeUserCho[0].uip_complexity === 'quick') {
		attorneyfeeval = 750;
	} else if ($storeUserCho[0].uip_complexity === 'normal') {
		attorneyfeeval = 1000;
	} else {
		attorneyfeeval = 1250;
	}
// get translationcosts
  let translationFrom = $storeUserCho[0].uip_multiselect_country_filing_Lang
  function translationVal(translationFrom, translationTo) {
    let translationNeeded = "yes";
  for (const word of translationTo) {
    if (translationFrom.includes(word)) {
      translationNeeded = "no";
      break;
    }
  }
  return translationNeeded;
}

function compareTranslations(translationFrom, translationTo) {
  let translationNeeded = "no";
  
  const uipLanguages = translationFrom.split(",");
  const nationalLanguages = translationTo.split(",");
  for (const language of nationalLanguages) {
    if (!uipLanguages.includes(language)) {
      translationNeeded = "yes";
      
      break;
    }
  }
  return translationNeeded;
}

function translationgetcost(translationFrom, translationTo) {
  let translationcosts = 0;
  
  const uipLanguages = translationFrom.split(",");
  const nationalLanguages = translationTo.split(",");
  for (const language of nationalLanguages) {
    if (!uipLanguages.includes(language)) {
      
      translationcosts = ($storeUserCho[0].uip_words_claims+$storeUserCho[0].uip_words)*$storeUserCho[0].uip_translation_fee
      break;
    }
  }
  return translationcosts;
}


// Adding up sums
tableData.forEach(function(item) {
    sum_year_1 += item.filing_fee+item.maintenance_year_01;
    sum_year_2 += item.publication_fee+item.publication_fee+item.maintenance_year_02;
    sum_year_3 += item.grant_fee+item.maintenance_year_03;
    sum_year_4 += item.maintenance_year_04;
    sum_year_5 += item.maintenance_year_05;
    sum_year_6 += item.maintenance_year_06;
    sum_year_7 += item.maintenance_year_07;
    sum_year_8 += item.maintenance_year_08;
    sum_year_9 += item.maintenance_year_09;
    sum_year_10 += item.maintenance_year_10;
    sum_year_11 += item.maintenance_year_11;
    sum_year_12 += item.maintenance_year_12;
    sum_year_13 += item.maintenance_year_13;
    sum_year_14 += item.maintenance_year_14;
    sum_year_15 += item.maintenance_year_15;
    sum_year_16 += item.maintenance_year_16;
    sum_year_17 += item.maintenance_year_17;
    sum_year_18 += item.maintenance_year_18;
    sum_year_19 += item.maintenance_year_19;
    sum_year_20 += item.maintenance_year_20;
}
  );
//function needed for attornefeval
sum_year_1 = sum_year_1 + attorneyfeeval + 800 
sum_year_2 = sum_year_2 + attorneyfeeval
sum_year_3 = sum_year_3 + attorneyfeeval
sum_year_4 = sum_year_4 + attorneyfeeval 
sum_year_5 = sum_year_5 + attorneyfeeval 
sum_year_6 = sum_year_6 + attorneyfeeval 
sum_year_7 = sum_year_7
sum_year_8 = sum_year_8
sum_year_9 = sum_year_9
sum_year_10 = sum_year_10
sum_year_11 = sum_year_11
sum_year_12 = sum_year_12
sum_year_13 = sum_year_13
sum_year_14 = sum_year_14
sum_year_15 = sum_year_15
sum_year_16 = sum_year_16
sum_year_17 = sum_year_17
sum_year_18 = sum_year_18
sum_year_19 = sum_year_19 
sum_year_20 = sum_year_20

let sum_years = [
	{
		"group": "Yearly Cost",
		"key": "Year 1",
		"value": sum_year_1 + translationgetcost(translationFrom, tableData[0].language_requirements_national)
	},
	{
		"group": "Yearly Cost",
		"key": "Year 2",
		"value": sum_year_2
	},
	{
		"group": "Yearly Cost",
		"key": "Year 3",
		"value": sum_year_3
	},
	{
		"group": "Yearly Cost",
		"key": "Year 4",
		"value": sum_year_4
	},
	{
		"group": "Yearly Cost",
		"key": "Year 5",
		"value": sum_year_5
	},
	{
		"group": "Yearly Cost",
		"key": "Year 6",
		"value": sum_year_6
	},
	{
		"group": "Yearly Cost",
		"key": "Year 7",
		"value": sum_year_7
	},
	{
		"group": "Yearly Cost",
		"key": "Year 8",
		"value": sum_year_8
	},
	{
		"group": "Yearly Cost",
		"key": "Year 9",
		"value": sum_year_9
	},
	{
		"group": "Yearly Cost",
		"key": "Year 10",
		"value": sum_year_10
	},
	{
		"group": "Yearly Cost",
		"key": "Year 11",
		"value": sum_year_11
	},
	{
		"group": "Yearly Cost",
		"key": "Year 12",
		"value": sum_year_12
	},
	{
		"group": "Yearly Cost",
		"key": "Year 13",
		"value": sum_year_13
	},
	{
		"group": "Yearly Cost",
		"key": "Year 14",
		"value": sum_year_14
	},
	{
		"group": "Yearly Cost",
		"key": "Year 15",
		"value": sum_year_15
	},
	{
		"group": "Yearly Cost",
		"key": "Year 16",
		"value": sum_year_16
	},
	{
		"group": "Yearly Cost",
		"key": "Year 17",
		"value": sum_year_17
	},
	{
		"group": "Yearly Cost",
		"key": "Year 18",
		"value": sum_year_18
	},
	{
		"group": "Yearly Cost",
		"key": "Year 19",
		"value": sum_year_19
	},
	{
		"group": "Yearly Cost",
		"key": "Year 20",
		"value": sum_year_20
	},
]
console.log("sum_years",sum_year_1)
</script>

<h2 style="margin-bottom:30px">Results</h2>
<div in:fade out:fade>
<StructuredList condensed>
	<StructuredListHead>
		<StructuredListRow head>
			<StructuredListCell head>Country</StructuredListCell>
			<StructuredListCell head>Fee Type</StructuredListCell>
			<StructuredListCell head>Language</StructuredListCell>
			<StructuredListCell head>Complexity</StructuredListCell>
			<StructuredListCell head>Year 1</StructuredListCell>
			<StructuredListCell head>Year 2</StructuredListCell>
			<StructuredListCell head>Year 3</StructuredListCell>
			<StructuredListCell head>Year 4</StructuredListCell>
			<StructuredListCell head>Year 5</StructuredListCell>
			<StructuredListCell head>Year 6</StructuredListCell>
			<StructuredListCell head>Year 7</StructuredListCell>
			<StructuredListCell head>Year 8</StructuredListCell>
			<StructuredListCell head>Year 9</StructuredListCell>
			<StructuredListCell head>Year 10</StructuredListCell>
			<StructuredListCell head>Year 11</StructuredListCell>
			<StructuredListCell head>Year 12</StructuredListCell>
			<StructuredListCell head>Year 13</StructuredListCell>
			<StructuredListCell head>Year 14</StructuredListCell>
			<StructuredListCell head>Year 15</StructuredListCell>
			<StructuredListCell head>Year 16</StructuredListCell>
			<StructuredListCell head>Year 17</StructuredListCell>
			<StructuredListCell head>Year 18</StructuredListCell>
			<StructuredListCell head>Year 19</StructuredListCell>
			<StructuredListCell head>Year 20</StructuredListCell>
		</StructuredListRow>
	</StructuredListHead>
	<StructuredListBody>
		{#each tableData as values}
			<StructuredListRow>
				<StructuredListCell>{values.country_name}</StructuredListCell>
				<StructuredListCell>Filing Fee</StructuredListCell>
				<StructuredListCell>{$storeUserCho[0].uip_multiselect_country_filing_Lang}</StructuredListCell>
				<StructuredListCell>{$storeUserCho[0].uip_complexity}</StructuredListCell>
				<StructuredListCell>{values.filing_fee}</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
			</StructuredListRow>
      <StructuredListRow>
				<StructuredListCell />
				<StructuredListCell>Examination Fee</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell>{values.examination_fee}</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
			</StructuredListRow>
      <StructuredListRow>
				<StructuredListCell />
				<StructuredListCell>Publication Fee</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell>{values.publication_fee}</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
			</StructuredListRow>
      <StructuredListRow>
				<StructuredListCell />
				<StructuredListCell>Grant Fee</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell>{values.grant_fee}</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell />
			</StructuredListRow>
			<StructuredListRow>
				<StructuredListCell />
				<StructuredListCell>Maintenance</StructuredListCell>
				<StructuredListCell />
				<StructuredListCell />
				<StructuredListCell>{values.maintenance_year_01}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_02}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_03}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_04}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_05}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_06}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_07}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_08}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_09}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_10}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_11}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_12}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_13}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_14}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_15}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_16}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_17}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_18}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_19}</StructuredListCell>
				<StructuredListCell>{values.maintenance_year_20}</StructuredListCell>
			</StructuredListRow>
      
		{/each}

		<StructuredListRow>
			<StructuredListCell>Attorney Fees</StructuredListCell>
			<StructuredListCell />
			<StructuredListCell />
			<StructuredListCell />
			<StructuredListCell>{attorneyfeeval + 800}</StructuredListCell>

			{#if $storeUserCho[0].uip_complexity == 'quick'}
				{#each { length: 1 } as _, i}
					<StructuredListCell>{attorneyfeeval}</StructuredListCell>
				{/each}
				{#each { length: 18 } as _, i}
					<StructuredListCell>0</StructuredListCell>
				{/each}
			{:else if $storeUserCho[0].uip_complexity == 'normal'}
				{#each { length: 2 } as _, i}
					<StructuredListCell>{attorneyfeeval}</StructuredListCell>
				{/each}
				{#each { length: 17 } as _, i}
					<StructuredListCell>0</StructuredListCell>
				{/each}
			{:else}
				{#each { length: 5 } as _, i}
					<StructuredListCell>{attorneyfeeval}</StructuredListCell>
				{/each}
				{#each { length: 14 } as _, i}
					<StructuredListCell>0</StructuredListCell>
				{/each}
			{/if}
		</StructuredListRow>
    <StructuredListRow>
      <StructuredListCell>Sum</StructuredListCell>
      <StructuredListCell></StructuredListCell>
      <StructuredListCell />
      <StructuredListCell />
      <StructuredListCell>{sum_year_1}</StructuredListCell>
      <StructuredListCell>{sum_year_2}</StructuredListCell>
      <StructuredListCell>{sum_year_3}</StructuredListCell>
      <StructuredListCell>{sum_year_4}</StructuredListCell>
      <StructuredListCell>{sum_year_5}</StructuredListCell>
      <StructuredListCell>{sum_year_6}</StructuredListCell>
      <StructuredListCell>{sum_year_7}</StructuredListCell>
      <StructuredListCell>{sum_year_8}</StructuredListCell>
      <StructuredListCell>{sum_year_9}</StructuredListCell>
      <StructuredListCell>{sum_year_10}</StructuredListCell>
      <StructuredListCell>{sum_year_11}</StructuredListCell>
      <StructuredListCell>{sum_year_12}</StructuredListCell>
      <StructuredListCell>{sum_year_13}</StructuredListCell>
      <StructuredListCell>{sum_year_14}</StructuredListCell>
      <StructuredListCell>{sum_year_15}</StructuredListCell>
      <StructuredListCell>{sum_year_16}</StructuredListCell>
      <StructuredListCell>{sum_year_17}</StructuredListCell>
      <StructuredListCell>{sum_year_18}</StructuredListCell>
      <StructuredListCell>{sum_year_19}</StructuredListCell>
      <StructuredListCell>{sum_year_20}</StructuredListCell>
    </StructuredListRow>
	</StructuredListBody>
</StructuredList>

<h2 style="margin-bottom:30px">Translation Fees</h2>
<div style="width:100%">
	<StructuredList id="sl2" condensed width="bind:clientWidth">
		<StructuredListHead>
			<StructuredListRow head>
				<StructuredListCell head />
        <StructuredListCell head>Translation from</StructuredListCell>
        <StructuredListCell head>Translation to</StructuredListCell>
        <StructuredListCell head>Translation needed?</StructuredListCell>
        <StructuredListCell head>Translation sum</StructuredListCell>
			</StructuredListRow>
		</StructuredListHead>
		<StructuredListBody>
			<StructuredListRow>
				<StructuredListCell noWrap></StructuredListCell>
        <StructuredListCell>{translationFrom}</StructuredListCell>
        <StructuredListCell>{tableData[0].language_requirements_national}</StructuredListCell>
        <StructuredListCell>{compareTranslations(translationFrom, tableData[0].language_requirements_national)}</StructuredListCell>
        <StructuredListCell noWrap>€ {translationgetcost(translationFrom, tableData[0].language_requirements_national)}</StructuredListCell>
			</StructuredListRow>
			
		</StructuredListBody>
	</StructuredList>

	<LineChart
	data={sum_years}
	options={{
	"title": "Yearly Cost",
	"axes": {
		"bottom": {
			"title": "Years",
			"mapsTo": "key",
			"scaleType": "labels"
		},
		"left": {
			"mapsTo": "value",
			"title": "Cost (€)",
			"scaleType": "linear"
		}
	},
	"height": "400px"
}}
	/>
</div>
</div>