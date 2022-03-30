<script>
    // TODO: import map from svelte-map base project if PR is merged, or from deno if improved version is published
    import Map
        from "https://raw.githubusercontent.com/HanniBal27-2001/svelte-map/d72894bb5e52feb014be6b17b4a9d1eb939a8b04/Maps.svelte";
    import {onMount} from 'svelte';

    let mapComponent
    export let inputString = '';
    let markerCoords = []
    let selectedPlace;
    let places = [];
    const placeholder = "Select Your City";

    function getCitys() {
        selectedPlace = placeholder

        if (inputString === '') {
            resetPlaceList()
            return
        }

        const url =
            'https://nominatim.openstreetmap.org/search?q="' +
            inputString +
            '"&format=json'

        fetch(url)
            .then(response => response.json())
            .then(data => {
                resetPlaceList();
                if (data.length > 0) {
                    data.forEach((result) => {
                        addListEntry(result.display_name, {lat: result.lat, long: result.lon});
                    })
                } else {
                    throw Error("Kein Ort für Eingabe gefunden")
                }
            })
            .catch(error => alert(error))
    }

    function resetPlaceList() {
        places = [];
    }

    // Break the list adding code into a function for easier re-use
    function addListEntry(placeName, placeCoordinates) {
        let optionNode = {
            name: placeName,
            coordinates: placeCoordinates,
        }
        places.push(optionNode)
    }

    function setSelectedPlace() {
        mapComponent.setMapCenter(selectedPlace.coordinates)
    }

    onMount(async () => {
            const position = {
                lat: 38.897957,
                long: -77.036560
            }
            mapComponent.setMapCenter(position)
        }
    )
</script>

<p>Where do you want to exchange crypto?</p>
<br/>
<Map bind:this={mapComponent} button={true}/>
<p>
    <input on:change={getCitys} bind:value={inputString}
           placeholder="...start typing"/>

    {#if places.length !== 0}
        <select bind:value={selectedPlace} on:change={setSelectedPlace}>
            <option>{placeholder}</option>
            {#each places as place}
                <option value={place}>
                    {place.name}
                </option>
            {/each}
        </select>
    {/if}

</p>

{#if inputString !== ''}
    O.K. I'm looking for Crypto Exchange Options in {inputString}.
{/if}
