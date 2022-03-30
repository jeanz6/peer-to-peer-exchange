<script>
    import {fade} from 'svelte/transition'

    let hasError = false
    let isSuccessVisible = false
    let submitted = false
    let kindOfOffer = 1

    export let location;
    export let pair;
    export let contact;
    export let amount;
    export let buyer;
    export let seller;

    const errorMessage = "All fields are mandatory";

    function handleSubmit() {
        isSuccessVisible = true;

        setTimeout(() => {
            isSuccessVisible = false;
        }, 4000);
    }


    async function postToDB() {
        submitted = true;

        let offerResult = "";
        if (kindOfOffer == 1) {
            offerResult = "seller"
        } else {
            offerResult = "buyer"
        }

        let amount_str = String(amount)


        /*
        if (seller == undefined && buyer == '') {
            kindOfOffer = 'buyer';
        } else if (seller == '' && buyer == undefined) {
            kindOfOffer = 'seller';
        } else {
            console.log("No kind of offer specified!");
            return 1;
        }
        */

        const res = await fetch('http://127.0.0.1:3000/addUser', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            // body: JSON.stringify({"abc": {location}})
            // TODO: Replace hardcoded strings with variables
            /*
            body: JSON.stringify({"pair": {pair},
                            "amount": {amount},
                            "location": {location},
                            "contact": {contact},
                            "kindOfOffer": "seller"})
            */
            body: JSON.stringify({"pair": {pair},
                            "amount": amount_str,
                            "location": {location},
                            "contact": {contact},
                            "kindOfOffer": offerResult})

        })
    } 
</script>

<h2>Select what you want to do!</h2>


{#if isSuccessVisible}
    <p class="error-alert" transition:fade={{duration:150}}>Data updated successfully</p>
{/if}

<div class="container">

    <form id="surveyForm" class="mt-4" class:submitted on:submit|preventDefault={handleSubmit}>

        <div class="form-group2">
            <table>
                <tr>
                    <th><input type="radio" id="offer" name="offerOrPurchase" bind:group={kindOfOffer} value={1}>
                        <label for="offer">Sell Crypto</label><br></th>
                    <th><input type="radio" id="purchase" name="offerOrPurchase" bind:group={kindOfOffer} value={2}>
                        <label for="purchase">Buy Crypto</label><br>
                    </th>
                </tr>
            </table>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" bind:value={pair} placeholder="Pair e.g. EurToETH" required>
        </div>


        <div class="form-group">
            <input type="number" class="form-control" step=".1" min="0" bind:value={amount} placeholder="Amount in target location e.g. 0.1"
                   required>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" bind:value={location} placeholder="location"/>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" bind:value={contact} placeholder="Telegram User Link" required>
        </div>

        <button class="btn btn-full" on:click="{postToDB}">Place your offer/request</button>
    </form>
</div>

<link href="https://gist.githubusercontent.com/Ajax30/08899d40e16069cd517b9756dc900acc/raw/04e4f9997245df079fa8500690d1878311115b20/global.css"
      rel="stylesheet" crossorigin="anonymous">

<style>

    .container {
        max-width: 1200px;
        margin: 0 auto;

    }

    table {
        max-width: 1200px;
        margin: 0 auto;
    }

    .form-group > *,
    .btn-full {
        width: 100%;
    }

    .form-control,
    .btn-full {
        border-radius: 3px;
    }

    .from-group2 {
        float: left;
    }


    .submitted input:invalid {
        border: 1px solid #c00;
    }

    .submitted input:focus:invalid {
        outline: 1px solid #c00;
    }

    .error-alert {
        border: 1px solid #c00 !important;
        padding: 6px;
        text-align: center;
        color: #c00;
        border-radius: 3px;
    }

</style>
