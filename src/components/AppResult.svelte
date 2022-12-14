<script>
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte';
	import { User } from 'carbon-icons-svelte';
	import { children } from 'svelte/internal';
	import { chosencountries, storeTableData, storeUserVal } from '../routes/app/stores.js';
	const tableData = Object.values($storeTableData);

	console.log('in component', $storeTableData);
	let attorneyfeeval = 0;
	if ($storeUserVal[0].uip_complexity === 'quick') {
		attorneyfeeval = 750;
	} else if ($storeUserVal[0].uip_complexity === 'normal') {
		attorneyfeeval = 1000;
	} else {
		attorneyfeeval = 1250;
	}
</script>

<h2 style="margin-bottom:30px">Results</h2>
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
				<StructuredListCell>{$storeUserVal[0].uip_multiselect_country_filing_Lang}</StructuredListCell>
				<StructuredListCell>{$storeUserVal[0].uip_complexity}</StructuredListCell>
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
			<StructuredListCell>{attorneyfeeval}</StructuredListCell>

			{#if $storeUserVal[0].uip_complexity == 'quick'}
				{#each { length: 1 } as _, i}
					<StructuredListCell>{attorneyfeeval}</StructuredListCell>
				{/each}
				{#each { length: 18 } as _, i}
					<StructuredListCell>0</StructuredListCell>
				{/each}
			{:else if $storeUserVal[0].uip_complexity == 'normal'}
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
	</StructuredListBody>
</StructuredList>

<h2 style="margin-bottom:30px">Translation Fees</h2>
<div style="width:100%">
	<StructuredList id="sl2" condensed width="bind:clientWidth">
		<StructuredListHead>
			<StructuredListRow head>
				<StructuredListCell head>Column A</StructuredListCell>
				<StructuredListCell head>Column B</StructuredListCell>
				<StructuredListCell head>Column C</StructuredListCell>
			</StructuredListRow>
		</StructuredListHead>
		<StructuredListBody>
			<StructuredListRow>
				<StructuredListCell noWrap>Row 1</StructuredListCell>
				<StructuredListCell>Row 1</StructuredListCell>
				<StructuredListCell>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor
					sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus
					dolor. Pellentesque vulputate nisl a porttitor interdum.
				</StructuredListCell>
			</StructuredListRow>
			<StructuredListRow>
				<StructuredListCell noWrap>Row 2</StructuredListCell>
				<StructuredListCell>Row 2</StructuredListCell>
				<StructuredListCell>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor
					sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus
					dolor. Pellentesque vulputate nisl a porttitor interdum.
				</StructuredListCell>
			</StructuredListRow>
			<StructuredListRow>
				<StructuredListCell noWrap>Row 3</StructuredListCell>
				<StructuredListCell>Row 3</StructuredListCell>
				<StructuredListCell>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor
					sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus
					dolor. Pellentesque vulputate nisl a porttitor interdum.
				</StructuredListCell>
			</StructuredListRow>
		</StructuredListBody>
	</StructuredList>
</div>
