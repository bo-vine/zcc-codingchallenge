if (navigator.onLine) {
  console.log("User is online");
  try {
    main();
  } catch (err) {
    console.log(err);
  }
} else {
  console.log("User is offline")
}

async function main() {
  const tickets = await getTickets();
  const requester = await getRequester(1265066693050);

  console.log(tickets);
  console.log(requester);
}

/* START REQUESTER INFO
    call to collecting requester information
*/
async function getRequester(id) {
  const requesterData = await fetch('requester/' + id);
  const requesterJson = await requesterData.json();
  console.log(requesterJson);

  let tempRequesterInfo = {
    name: requesterJson.user.name,
    email: requesterJson.user.email
  };

  return tempRequesterInfo;
}
// END REQUESTER INFO

/* START TICKET CALL
     pulling ticket information and moving it to the client side
*/
async function getTickets() {
  const apiData = await fetch('tickets');
  const ticketsJson = await apiData.json();
  let tempTicketList = {
    length: ticketsJson.tickets.length
  };
  console.log(ticketsJson);
  for(let i = 0; i < ticketsJson.tickets.length; i++) {
    let currentTicket = ticketsJson.tickets[i];
    tempTicketList[i] = await {
      id: currentTicket.id,
      status: currentTicket.status,
      subject: currentTicket.subject,
    }
  }
  console.log(tempTicketList);
  return tempTicketList;
}

// END TICKET CALL
