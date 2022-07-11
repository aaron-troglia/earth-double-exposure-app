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
