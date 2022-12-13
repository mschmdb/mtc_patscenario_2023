<script>
    import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
  } from "carbon-components-svelte";
	import { User } from "carbon-icons-svelte";
	import { children } from "svelte/internal";
    import { chosencountries, storeTableData } from '../routes/app/stores.js';
    const tableData = Object.values($storeTableData)
   
    console.log("in component",$storeTableData)
</script>

<StructuredList>
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
        <StructuredListCell>One Time</StructuredListCell>
        <StructuredListCell></StructuredListCell>
        <StructuredListCell></StructuredListCell>
        <StructuredListCell>Year 1</StructuredListCell>
        <StructuredListCell>Year 2</StructuredListCell>
        <StructuredListCell>Year 3</StructuredListCell>
        <StructuredListCell>Year 4</StructuredListCell>
        <StructuredListCell>Year 5</StructuredListCell>
        <StructuredListCell>Year 6</StructuredListCell>
        <StructuredListCell>Year 7</StructuredListCell>
        <StructuredListCell>Year 8</StructuredListCell>
        <StructuredListCell>Year 9</StructuredListCell>
        <StructuredListCell>Year 10</StructuredListCell>
        <StructuredListCell>Year 11</StructuredListCell>
        <StructuredListCell>Year 12</StructuredListCell>
        <StructuredListCell>Year 13</StructuredListCell>
        <StructuredListCell>Year 14</StructuredListCell>
        <StructuredListCell>Year 15</StructuredListCell>
        <StructuredListCell>Year 16</StructuredListCell>
        <StructuredListCell>Year 17</StructuredListCell>
        <StructuredListCell>Year 18</StructuredListCell>
        <StructuredListCell>Year 19</StructuredListCell>
        <StructuredListCell>Year 20</StructuredListCell>
      </StructuredListRow>
      <StructuredListRow>
        <StructuredListCell>{values.country_name}</StructuredListCell>
        <StructuredListCell>Maintenance</StructuredListCell>
        <StructuredListCell></StructuredListCell>
        <StructuredListCell></StructuredListCell>
        <StructuredListCell>Year 1</StructuredListCell>
        <StructuredListCell>Year 2</StructuredListCell>
        <StructuredListCell>Year 3</StructuredListCell>
        <StructuredListCell>Year 4</StructuredListCell>
        <StructuredListCell>Year 5</StructuredListCell>
        <StructuredListCell>Year 6</StructuredListCell>
        <StructuredListCell>Year 7</StructuredListCell>
        <StructuredListCell>Year 8</StructuredListCell>
        <StructuredListCell>Year 9</StructuredListCell>
        <StructuredListCell>Year 10</StructuredListCell>
        <StructuredListCell>Year 11</StructuredListCell>
        <StructuredListCell>Year 12</StructuredListCell>
        <StructuredListCell>Year 13</StructuredListCell>
        <StructuredListCell>Year 14</StructuredListCell>
        <StructuredListCell>Year 15</StructuredListCell>
        <StructuredListCell>Year 16</StructuredListCell>
        <StructuredListCell>Year 17</StructuredListCell>
        <StructuredListCell>Year 18</StructuredListCell>
        <StructuredListCell>Year 19</StructuredListCell>
        <StructuredListCell>Year 20</StructuredListCell>
      </StructuredListRow>
    {/each}

    </StructuredListBody>
  </StructuredList>