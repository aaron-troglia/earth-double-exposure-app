<script>
    export let earthURL;
    export let userImgSrc;

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
    <img src={userImgSrc} alt="User" width="500" class="user-image" id="user-image" style={`filter: brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%);`} />
    <img src={earthURL} class="earth-image" width="500" id="earth-image" alt="Earth" />
</div>

<input on:change={changeBrightness} type="range" min="5" max="150" step="5" value={brightness} name="brightness" id="brightness" />
<input on:change={changeContrast} type="range" min="50" max="250" step="5" value={contrast} name="brightness" id="brightness" />
<input on:change={changeSaturation} type="range" min="5" max="100" step="5" value={saturation} name="brightness" id="brightness" />

<div on:click={exportImage} class="export">Export Image</div>

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
