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
  restartable();
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
    console.log(newDiv);
    let h2Content = await document.createTextNode(this.status);
    newH2[0].appendChild(h2Content);
    newH2[0].className = "ticketChild status";
    h2Content = await document.createTextNode(this.subject);
    newH2[1].appendChild(h2Content);
    newH2[1].className = "ticketChild subject";

    const throwaway = document.getElementById("throwaway");
    console.log(throwaway)
    throwaway.appendChild(newDiv);
  }

  async domDetailedView() {

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
    length: ticketsJson.tickets.length,
    links: ticketsJson.links,
    hasMore: ticketsJson.meta.hasMore
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
  START otherPage
    handles the pagination calls from the client
*/
async function otherPage(link) {
  const myObj = document.getElementById('throwaway');
  myObj.remove();
  const apiData = await fetch('another/' + link);

}
// END otherPage

/*
START restartable
handles replacing all the info on the document
*/
async function restartable() {
  const div = document.createElement('div');
  const span = document.createElement('h1');
  const ticketViewer = document.getElementById('ticket_viewer');
  const content = document.createTextNode('Loading');
  const prevBut = document.createElement('button');
  const nextBut = document.createElement('button');
  const ticketsList = await getTickets();

  let butContent = document.createTextNode('Previous');
  prevBut.appendChild(butContent);
  butContent = document.createTextNode('Next');
  nextBut.appendChild(butContent);
  span.appendChild(content);

  prevBut.setAttribute(
    'onclick',
    'otherPage(\"' + decodeURIComponent(ticketsList.links.prev) + '\")'
  );
  nextBut.setAttribute(
    'onclick',
    'otherPage(\"' + decodeURIComponent(ticketsList.links.next) + '\")'
  );

  div.id = "throwaway";
  div.style.display = 'none';
  console.log(div);

  ticketViewer.appendChild(div);
  ticketViewer.appendChild(span);

  let i = 0;
  for(i = 0; i < ticketsList.length; i++ ) {
    const requester = await getRequester(ticketsList[i].requester_id);
    let ticket = await new Ticket(
      ticketsList[i].id, ticketsList[i].status,
      ticketsList[i].subject, ticketsList[i].description,
      requester.name, requester.email
    );
    ticket.domSimpleView();
  }

  div.style.display = 'block';
  span.style.display = 'none';
  ticketViewer.appendChild(prevBut);
  ticketViewer.appendChild(nextBut);

  console.log(i);
  console.log(ticketsList);
}
// END restartable
