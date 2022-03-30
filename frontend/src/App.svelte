<script>
  import Welcome from "@/components/Welcome.svelte";
  import Search from "@/components/Search.svelte";
  import Offers from "@/components/Offers.svelte";
  import { fade } from "svelte/transition";
  import OfferForm from "./components/OfferForm.svelte";


  let title = "Peer 2 Peer Exchange";
  let searchPlace = ''
</script>


<main transition:fade>
  <Welcome {title} />
  <Offers />
  <Search bind:inputString={searchPlace}/>
  <OfferForm bind:placeString={searchPlace} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
