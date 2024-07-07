<script>
	export let compositeURL;

    let brightness = 50;
    let contrast = 100;
    let saturation = 25;

    const changeBrightness = (e) => {
        brightness = e.target.value;
    }

    const changeContrast = (e) => {
        contrast = e.target.value;
    }

    const changeSaturation = (e) => {
        saturation = e.target.value;
    }

    const exportImage = () => {
    }
</script>

	{#if compositeURL}
	<div class="images-wrapper my-8 " id="double-exposure">
		<img src={compositeURL} class="composite-image shadow-2xl text-center mx-auto" width="500" height="500" id="composite" alt="Double Exposure" />
	</div>
	{/if}

