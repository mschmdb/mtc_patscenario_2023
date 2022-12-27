<script lang="ts">
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte';
	import { LineChart } from '@carbon/charts-svelte';
	import { StackedAreaChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";

	import '@carbon/charts/styles.css';
	import { storeTableData } from '../routes/stores.js';
	import { options } from '@carbon/charts/configuration.js';
	import { Title } from '@carbon/charts/components/index.js';
	$: table = Object.values($storeTableData);

    // set Array for Chart display
	let chart = [];
    const countriesArray = Object.entries($storeTableData);

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
				}
			];
		});

		chart.push(...countryChart);
        chart = chart;
	});
</script>

<h2 style="margin-bottom:30px">Results</h2>
<div>
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
			{#each table as values, i}
				<StructuredListRow>
					<StructuredListCell>{values['year_1']['country_name']}</StructuredListCell>
					<StructuredListCell>Maintenance Fee</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].maintenance_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
				<StructuredListRow>
					<StructuredListCell />
					<StructuredListCell>Filing Fee</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].filing_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
				<StructuredListRow>
					<StructuredListCell />
					<StructuredListCell>Examination Fee</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].examination_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
				<StructuredListRow>
					<StructuredListCell />
					<StructuredListCell>Publication Fee</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].publication_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
				<StructuredListRow>
					<StructuredListCell />
					<StructuredListCell>Grant Fee</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].grant_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
				<StructuredListRow>
					<StructuredListCell />
					<StructuredListCell>Attorney Fee</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].attorney_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
				<StructuredListRow>
					<StructuredListCell />
					<StructuredListCell>Sum</StructuredListCell>
					<StructuredListCell />
					<StructuredListCell />
					{#each Object.keys(values) as year}
						<StructuredListCell>{values[year].sum_fee}</StructuredListCell>
					{/each}
				</StructuredListRow>
			{/each}
		</StructuredListBody>
	</StructuredList>

	<!-- <LineChart
		data={chart}
		options={{
			title: 'Yearly Cost',
			axes: {
				bottom: {
					title: 'Years',
					mapsTo: 'key',
					scaleType: 'labels'
				},
				left: {
					mapsTo: 'value',
					title: 'Cost (€)',
					scaleType: 'linear'
				}
			},
			height: '400px'
		}}
	/> -->
	<StackedAreaChart
		data={chart}
		options={{
			title: 'Time Series',
			axes: {
				left: {
                    title: "Euro",
					stacked: true,
					scaleType: 'linear',
					mapsTo: 'value'
				},
				bottom: {
                    title: "Year",
					scaleType: 'number',
					mapsTo: 'key'
				}
			},
			curve: 'curveMonotoneX',
			height: '400px'
		}}
	/>

	{JSON.stringify(chart)}
</div>
