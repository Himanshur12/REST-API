'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.text());
//app.use(bodyParser.urlencoded({ extended: true }));

let contacts = require('./data');

app.get('/', (request, response) => res.send('Server Works!'))

app.get('/api/contacts', (request, response) => {
  if (!contacts) {
    response.status(404).json({ message: 'No contacts found.' });
  }
  response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  });

  if (!contact) {
    response.status(404).json({ message: 'Contact not found' });
  }

  response.json(contact[0]);
});

app.post('/api/contacts', (request, response) => {

  var contact = {
    id: contacts.length + 1,
    first_name : JSON.parse(request.body).first_name,
    last_name : JSON.parse(request.body).last_name,
    Age: JSON.parse(request.body).Age,
  
  };

  contacts.push(contact);

  response.json(contact);

});

app.put('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    contact[key] = request.body[key];
  });

  contacts[index] = contact;

  // response.json({ message: `User ${contactId} updated.`});
  response.json(contacts[index]);
});

app.delete('/api/contacts/:id', (request, response) => {
  
  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  contacts.splice(index, 1);

  response.json({ message: `User ${contactId} deleted.`});

});

const hostname = 'localhost';
const port = 3000;

const server = app.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
  
});
