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

/*****************
 * GOOD 'OL MAIN *
 *****************/
async function main() {
  const ticketsList = await getTickets();

  for(let i = 0; i < ticketsList.length; i++ ) {
    const requester = await getRequester(ticketsList[i].requester_id);
    let ticket = await new Ticket(
      ticketsList[i].id, ticketsList[i].status,
      ticketsList[i].subject, ticketsList[i].description,
      requester.name, requester.email
    );
    ticket.domSimpleView();
  }

  console.log(ticketsList);
}
// End Main

/****************
 * CLASSES AREA *
 ****************/

class Ticket {
  constructor(id, status, subject, description, name, email) {
    this.id = id;
    this.status = status;
    this.subject = subject;
    this.description = description;
    this.name = name;
    this.email = email;
  }

  async domSimpleView() {
    const newDiv = document.createElement("div");
    newDiv.className = "ticketlist_wrapper";
    newDiv.setAttribute('ticket_id', this.id);
    const newH2 = [document.createElement("h2"),
                   document.createElement("h2")];

    newDiv.appendChild(newH2[0]);
    newDiv.appendChild(newH2[1]);

    let h2Content = await document.createTextNode(this.status);
    newH2[0].appendChild(h2Content);
    newH2[0].className = "ticketChild status";
    h2Content = await document.createTextNode(this.subject);
    newH2[1].appendChild(h2Content);
    newH2[1].className = "ticketChild subject";

    const ticket_viewer = document.getElementById("ticket_viewer");
    ticket_viewer.appendChild(newDiv);
  }

  domDetailedView() {

  }
}

/******************
 * FUNCTIONS AREA *
 ******************/

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
      requester_id: currentTicket.requester_id,
      status: currentTicket.status,
      subject: currentTicket.subject,
      description: currentTicket.description
    }
  }
  console.log(tempTicketList);
  return tempTicketList;
}
// END getTickets

/*
  START loadCSS
*/
