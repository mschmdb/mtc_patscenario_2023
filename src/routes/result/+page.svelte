<script>
     import "carbon-components-svelte/css/g10.css";
     import { MultiSelect } from "carbon-components-svelte";
	import { get } from "svelte/store";

    //Fetch Data
    export let data
    //Convert Data
    const values = Object.values(data);
    let stringToMatch = '';
    let countries = values
    console.log(stringToMatch)
    function getFilteredCountries(countries, stringToMatch)
    {
    if(stringToMatch){
        return countries.filter(country => {
            return country.Country.toLowerCase().includes(stringToMatch.toLowerCase()) || country.Currency.includes(stringToMatch.toUpperCase());
        });
    } else {
        return countries
    }
    }


</script>

<div class="container m-8">
    <h1 class="text-2xl">Patscenario</h1>
    
    <form>
        <MultiSelect  
    bind:value={stringToMatch}
    titleText=""
    label="Select Countries"
    items={[
        { id: "Germany", text: "Germany" },
        { id: "Australia", text: "Australia" },
        { id: "UK", text: "United Kingdom (EP)" },
    ]}
    />
        <input placeholder="Enter a Country Name"
        class="
        block
        rounded-md
        border-gray-300
        m-8
        shadow-sm w-80" type="text" bind:value={stringToMatch}>
    </form>
    {#each getFilteredCountries(countries, stringToMatch) as value }
    
    <li>{value.Country} - { value.Filing_Fee } { value.Currency }</li>
      
    {/each}
    </div>