const { getClient } = require("../db/postgres");

//TODO: CRUD and more for ticket types

exports.getTicketTypes = (req, res) => {
  const pgClient = getClient();

  pgClient
    .query('SELECT ticket_type_id AS "ticketTypeId", name, mark FROM ticket_types')
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET ticket types from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getTicketTypesByCenterId = (req, res) => {
  const pgClient = getClient();
  const centerId = req.params["centerId"];

  pgClient
    .query(
      'SELECT ticket_type_id AS "ticketTypeId", name, mark FROM ticket_types WHERE ticket_type_id IN (SELECT ticket_type_id FROM office_ticket_types WHERE office_id IN (SELECT office_id FROM offices WHERE center_id = $1))',
      [centerId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET ticket types from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getTicketTypeById = (req, res) => {
  const pgClient = getClient();
  const ticketTypeId = req.params.ticketTypeId;

  pgClient
    .query('SELECT ticket_type_id AS "ticketTypeId", name, mark FROM ticket_types WHERE ticket_type_id = $1', [ticketTypeId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET ticket type from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.createTicketType = (req, res) => {
  const pgClient = getClient();
  const mark = req.body.mark;
  const name = req.body.name;

  pgClient
    .query("INSERT INTO ticket_types(ticket_type_id, name, mark) VALUES (DEFAULT, $1, $2)", [name, mark])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT ticket type into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.editTicketType = (req, res) => {
  const pgClient = getClient();
  const ticketTypeId = req.body.ticketTypeId;
  const mark = req.body.mark;
  const name = req.body.name;

  pgClient
    .query("UPDATE ticket_types SET name = $1, mark = $2 WHERE ticket_type_id = $3", [name, mark, ticketTypeId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot UPDATE ticket type in DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.deleteTicketType = (req, res) => {
  const pgClient = getClient();
  const ticketTypeId = req.body.ticketTypeId;

  pgClient
    .query("DELETE FROM ticket_types WHERE ticket_type_id = $1", [ticketTypeId])
    .then(() => {
      res.status(200).send({ message: "Ticket type deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot DELETE ticket type from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getUnpinnedTicketTypesByOfficeId = (req, res) => {
  const pgClient = getClient();
  const officeId = req.body.officeId;

  pgClient
    .query(
      'SELECT ticket_type_id AS "ticketTypeId", name, mark FROM ticket_types WHERE ticket_type_id NOT IN (SELECT ticket_type_id FROM office_ticket_types WHERE office_id = $1)',
      [officeId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET ticket type from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.getPinnedTicketTypesByOfficeId = (req, res) => {
  const pgClient = getClient();
  const officeId = req.body.officeId;

  pgClient
    .query(
      'SELECT ticket_type_id AS "ticketTypeId", name, mark FROM ticket_types LEFT JOIN office_ticket_types USING (ticket_type_id) WHERE office_id = $1 ORDER BY sequence',
      [officeId]
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot GET ticket type from DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.addTicketTypeToOffice = (req, res) => {
  const pgClient = getClient();
  const officeId = req.body.officeId;
  const ticketTypeId = req.body.ticketTypeId;
  const sequence = req.body.sequence;

  //Fixed sequence before new element added
  pgClient.query("UPDATE office_ticket_types SET sequence = sequence + 1 WHERE sequence >= $1", [sequence]);

  pgClient
    .query("INSERT INTO office_ticket_types(office_id, ticket_type_id, sequence) VALUES ($1, $2, $3)", [officeId, ticketTypeId, sequence])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT ticket type into DB",
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.removeTicketTypeFromOffice = (req, res) => {
  const pgClient = getClient();
  const officeId = req.body.officeId;
  const ticketTypeId = req.body.ticketTypeId;
  const sequence = req.body.sequence;

  pgClient
    .query("DELETE FROM office_ticket_types WHERE office_id = $1 AND ticket_type_id = $2", [officeId, ticketTypeId])
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot INSERT ticket type into DB",
        detailed_message: err,
      });
      console.error(err);
    });

  //Fixed sequence after element was deleted
  pgClient.query("UPDATE office_ticket_types SET sequence = sequence - 1 WHERE sequence > $1", [sequence]);
};

exports.optimizeSequence = (req, res) => {
  const pgClient = getClient();
  const officeId = req.body.officeId;
  const ticketTypeId = req.body.ticketTypeId;
  const sequence = req.body.sequence;
  const prevSequence = req.body.prevSequence;

  //Fix other records sequence before update
  if (prevSequence < sequence) {
    pgClient
      .query("UPDATE office_ticket_types SET sequence = sequence - 1 WHERE sequence > $1 AND sequence <= $2 AND office_id = $3", [
        prevSequence,
        sequence,
        officeId,
      ])
      .then(() => {
        pgClient
          .query("UPDATE office_ticket_types SET sequence = $1 WHERE office_id = $2 AND ticket_type_id = $3", [
            sequence,
            officeId,
            ticketTypeId,
          ])
          .then((result) => {
            res.status(200).send(result.rows);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Cannot INSERT ticket type into DB",
              detailed_message: err,
            });
            console.error(err);
          });
      });
  } else {
    pgClient
      .query("UPDATE office_ticket_types SET sequence = sequence + 1 WHERE sequence < $1 AND sequence >= $2 AND office_id = $3", [
        prevSequence,
        sequence,
        officeId,
      ])
      .then(() => {
        pgClient
          .query("UPDATE office_ticket_types SET sequence = $1 WHERE office_id = $2 AND ticket_type_id = $3", [
            sequence,
            officeId,
            ticketTypeId,
          ])
          .then((result) => {
            res.status(200).send(result.rows);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Cannot INSERT ticket type into DB",
              detailed_message: err,
            });
            console.error(err);
          });
      });
  }
};
