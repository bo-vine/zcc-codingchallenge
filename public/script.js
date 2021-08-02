if (navigator.onLine) {
  console.log("User is online");
  try {
    async function getTickets() {
      const ticketsData = await fetch('tickets');
      const json = await ticketsData.json();
      console.log(json);
    }

    getTickets();
  } catch(err) {
    console.log(err);
  }

} else {
  console.log("User is offline")
}
