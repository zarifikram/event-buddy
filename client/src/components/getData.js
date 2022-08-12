import axios from 'axios';



const getData = async (link, setFunction) => {
    const response = await axios.get(link);
    console.log(response)
    setFunction(response.data)

}

export default getData;