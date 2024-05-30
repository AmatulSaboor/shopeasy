// function to formate recived data from server in a more readable form
const dateFormater = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  export default dateFormater