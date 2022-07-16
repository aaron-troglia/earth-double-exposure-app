<script lang="ts">
	import axios from 'axios';
    import ImagePreview from './ImagePreview.svelte';
    import UserImageForm from './UserImageForm.svelte';

	const BASE_URL = 'https://epic.gsfc.nasa.gov/api/natural/date';
	let earthURL = '';
	let userImgSrc = '';
	
	const getEarth = async (date) => {
		const newDate = new Date(date);
		const month = ('0' + (newDate.getMonth() + 1)).slice(-2); //Months and days start at 0
		const day = ('0' + (newDate.getDate() + 1)).slice(-2);
		const year = newDate.getFullYear();
		
		try {
			const response = await axios.get(`${BASE_URL}/${date}`)
			const arr = response.data;
						
			const name = arr[0].image + '.png';
			const archive = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/`
			const source = archive + name;

			earthURL = source;

			setTimeout(() => {
				let canvas = document.createElement('canvas');
				let canvas2 = document.createElement('canvas');

				canvas.id = "earthImage";
				canvas.width = 2048;
				canvas.height = 2048;
	
				canvas2.id = "userImage";
				canvas2.width = 2048;
				canvas2.height = 2048;			

				const body = document.getElementsByTagName("body")[0];
				body.appendChild(canvas);
				body.appendChild(canvas2);

				let context = canvas.getContext("2d");
				let context2 = canvas2.getContext("2d");

				let earthImage = document.getElementById("earth-image");
				context.drawImage(earthImage, 0, 0);

				let userImage = document.getElementById("user-image");
				context2.drawImage(userImage, 0, 0);
				
			}, 5000);

		} catch (error) {
			console.error(error);
		}
	}

	const setImage = (image) => {
		let reader = new FileReader();

		reader.readAsDataURL(image);
		reader.onload = () => {
			userImgSrc = reader.result;
		}
	}
	
	const submitForm = (e) => {
		const formData = new FormData(e.target);
		const data:any = {};

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		if (data.userDate) {
			getEarth(data.userDate)
		}
		
		setImage(data.userImage);
	}
</script>

<UserImageForm {submitForm} />
<ImagePreview {earthURL} {userImgSrc} />


<style>
	#earthImage {
		width: 500px;
		height: 500px;
	}

	#userImage {
		position: absolute;
		top: 0;
		left: 0;
		width: 500px;
		height: 500px;
		mix-blend-mode: overlay;
		object-fit: cover;
		opacity: 1;
	}
</style>
