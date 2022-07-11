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
</script>

<div class="images-wrapper">
    <img src={userImgSrc} alt="User" width="500" class="user-image" style={`filter: brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%);`} />
    <div style={`background-image: url('${earthURL}');`} class="earth-image" alt="Earth" />
</div>

<input on:change={changeBrightness} type="range" min="5" max="150" step="5" value={brightness} name="brightness" id="brightness" />
<input on:change={changeContrast} type="range" min="50" max="250" step="5" value={contrast} name="brightness" id="brightness" />
<input on:change={changeSaturation} type="range" min="5" max="100" step="5" value={saturation} name="brightness" id="brightness" />

<style>
    .earth-image {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
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
</style>
