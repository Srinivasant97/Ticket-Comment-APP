var express = require("express");
var cors = require("cors");
var { PrismaClient } = require("@prisma/client");
require("dotenv").config();
var app = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//User API
app.post("/user/create/", async (req, res) => {
  const user = await dbHandling(
    prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    })
  );
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(500).send("Internal server Error");
});

app.post("/user/login/", async (req, res) => {
  const user = await dbHandling(
    prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        name: true,
        email: true,
      },
    })
  );
  if (user && user.name === req.body.name) {
    return res.status(200).send(user);
  }
  return res.status(500).send("Internal server Error");
});

//Ticket API
app.get("/ticket/all/", async (req, res) => {
  const response = await dbHandling(prisma.ticket.findMany(), req, res);
  console.log(response);
  if (response) {
    return res.status(200).send(response);
  }
  return res.status(500).send("Internal server Error");
});

app.get("/ticket/:id", async (req, res) => {
  const response = await dbHandling(
    prisma.ticket.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        title: true,
        body: true,
        createdBy: true,
        createdAt: true,
        comments: {
          where: {
            parentId: null,
          },
          select: {
            id: true,
            body: true,
            createdBy: true,
            updatedAt: true,
            ticketId: true,
            parentId: true,
            children: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })
  );
  if (response) {
    return res.status(200).send(response);
  }
  return res.status(500).send("Internal server Error");
});

app.post("/ticket/create/", async (req, res) => {
  const response = await dbHandling(
    prisma.ticket.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        createdBy: req.body.user,
      },
    })
  );
  if (response) {
    return res.status(200).send(response);
  }
  return res.status(500).send("Internal server Error");
});

//Comment API

app.post("/comment/:id/create/", async (req, res) => {
  const response = await dbHandling(
    prisma.comment.create({
      data: {
        body: req.body.body,
        createdBy: req.body.user,
        ticketId: req.params.id,
        parentId: req.body.parent,
      },
    })
  );
  if (response) {
    return res.status(200).send(response);
  }
  return res.status(500).send("Internal server Error");
});

app.put("/comment/:id/update/:cmtid", async (req, res) => {
  await dbHandling(
    prisma.comment.update({
      where: { id: req.params.cmtid },
      data: { body: req.body.body },
    })
  );
});

app.delete("/comment/:id/delete/:cmtid", async (req, res) => {
  await dbHandling(
    prisma.comment.delete({
      where: { id: req.params.cmtid },
    })
  );
});

function dbHandling(promise) {
  return promise
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
}

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is Started");
});
