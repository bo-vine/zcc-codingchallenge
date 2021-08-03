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
/*
  GOOD 'OL MAIN
*/
async function main() {
  const tickets = await getTickets();

  console.log(tickets);
}
// End Main

/**
* CLASSES AREA
*/

class Ticket {
  constructor(id, status, subject, description) {
    this.id = id;
    this.status = status;
    this.subject = subject;
    this.description = description;
    this.name = getRequester(this.id).name;
    this.email = getRequester(this.id).email;
  }

  domSimpleComponent() {

  }

  domDetailedComponent() {
    
  }
}

/**
* FUNCTIONS AREA
*/

/*
  START getRequester
    call to collect requester information from Zendesk API/users
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
// END getRequester

/*
  START getTickets
     pulling ticket information from Zendesk API/tickets
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
      description: currentTicket.description
    }
  }
  console.log(tempTicketList);
  return tempTicketList;
}
// END getTickets
