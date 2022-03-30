<script>
	async function getUsers() {
		const res = await fetch('http://127.0.0.1:3000/queryUsers', {
			method: 'POST'
		});
		const text = await res.json();
		console.log(text);

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	// TODO: Edit the table
	let columns = ["Pair", "Amount in Target", "Location", "Contact", "Offer/Purchase"]
	let data = [
    ["EURToETH", "0.1", "49_8", "spengler", "https://t.me/danceplanner", "Offer"]
  	]
	let test_data = getUsers();
	let test_data1 = [
		{ pair: "ETFtoEUR", amount: 2, location: "Stuttgart", contact: "florianott"},
  		{ pair: "ETFtoEUR", amount: 2, location: "Stuttgart", contact: "florianott" }
	]
	let newRow = [...columns];
	
	function addRow() {
		data = [...data, [...newRow]]
        newRow = columns
	}

	
	function deleteRow(rowToBeDeleted) {
		data = data.filter(row => row != rowToBeDeleted)
	}
</script>

<table>
	<tr>
		{#each columns as column}
			<th>{column}</th>
		{/each}
	</tr>
	{#await test_data}
	<tr>
		<td>Wait for connection</td>
	</tr>
	{:then rowData}
	{#each rowData as {pair, amount, location, contact, trader_type}, i}
		<tr>
			<td>{pair}</td>
			<td>{amount}</td>
			<td>{location}</td>
			<td>{contact}</td>
			<td>{trader_type}</td>
		</tr>
	{/each}
	{:catch error}
	<tr>
		<td>Could not connect to Database</td>
	</tr>
	{/await}
</table>

<style>
	table {
		margin-left:auto;
		margin-right: auto;
		border:3px solid;
        border-collapse: separate;
		border-style: solid;
		
		width: auto;
		max-width: fit-content;

		display: block;
		overflow-x: auto;
		white-space: nowrap;
  		
    }
	th {
	    border:3px solid;
        border-top-color: aqua;
		border-style: groove;
		width:auto;
		background-color: rgb(112, 119, 182);
		
	}
	td{
		position: center;
        border:3px solid;
        
	}

	.new {
		color: grey;
	}
	.new td:focus {
		color: black;
	}

    [contenteditable] {
        margin-left:auto;
		margin-right: auto;
		width:200px
		
      }
</style>