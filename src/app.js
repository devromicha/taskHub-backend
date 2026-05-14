const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// routes (check path!)
const authRoutes = require("./auth/auth.route");

const app = express();

app.use(cors());
app.use(express.json());


// ================= SWAGGER =================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskHub API",
      version: "1.0.0",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/**/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);


// ================= ROUTES =================
app.use("/api/auth", authRoutes);


// ================= HOME =================
app.get("/", (req, res) => {
  res.send("TaskHub Backend Running 🚀");
});

module.exports = app;




// const express = require('express')
// const cors = require('cors');
// const authRoutes = require("./auth/auth.route")

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocs)
// );

// const swaggerUi = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const { version } = require('mongoose');

// const swaggerOptions = {
//     definition: {
//         openapi: "3.0.0",
//         info:{
//             title:"TaskHub Api",
//             version: "1.0.0",
//             description: "TaskHub Backend API documentation",
//         },
//     },

//     apis: ["./src/auth/*.js"]
// }



// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes)

// app.get('/',(req,res) => {
//     res.send('Taskhub Api Running')
// });

// module.exports = app;