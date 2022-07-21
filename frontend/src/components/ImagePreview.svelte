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

<div class="images-wrapper" id="double-exposure">
	<img src={compositeURL} class="composite-image" width="500" id="composite" alt="Composite" />
</div>


<style>
    .earth-image {
		width: 500px;
		height: 500px;
	}

	.user-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 500px;
		height: 500px;
		mix-blend-mode: overlay;
		object-fit: cover;
		opacity: 1;
	}

	.images-wrapper {
		position: relative;
		width: 500px;
		height: auto;
	}

	.export {
	    display: inline-block;
	    padding: 0.5em 0.25em;
	    background-color: turquoise;
	    color: #fff;
	    border-radius: 5px;
	}
</style>
