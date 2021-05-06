const express = require("express");
const cors = require("cors");
const expressHandlebars = require("express-handlebars");
const path = require("path");

const assets = require("./client/build/asset-manifest.json");

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.static(path.join(`${__dirname}/client/build`)));

app.set("view engine", "handlebars");
app.set("views", path.join(`${__dirname}/layouts`));

const hbs = expressHandlebars.create({
  layoutsDir: path.join(`${__dirname}/layouts`),
  defaultLayout: "index",
});

app.engine("handlebars", hbs.engine);

app.get("/", (req, res) => {
  const assetsNames = Object.keys(assets.files).filter(
    (e) => !e.includes(".map") && !e.includes("README")
  );
  assetsNames.map((an) => assets.files[an]);
  const htmlAssets = {
    entries: {
      css: assets.entrypoints.filter((e) => e.includes(".css")),
      js: assets.entrypoints.filter((e) => e.includes(".js")),
    },
    assets: {
      css: assetsNames
        .filter((e) => e.includes(".css"))
        .map((an) => assets.files[an]),
      js: assetsNames
        .filter((e) => e.includes(".js"))
        .map((an) => assets.files[an]),
    },
  };

  console.log(htmlAssets);
  res.render("index", htmlAssets);
});

const apiRouter = express.Router();

apiRouter.get("/todo", (req, res) => {
  res.send([
    {
      id: "001",
      title: "Test React",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "002",
      title: "Test Express",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "003",
      title: "Test Electron",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "004",
      title: "Test Express + React",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "005",
      title: "Test Electron + Express + React",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "006",
      title: "Test empaquetado",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "007",
      title: "Test instalar paquete",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "008",
      title: "Test deploy server",
      content: "lorepsuim isum lorepsuim isum",
    },
    {
      id: "008",
      title: "Test deploy client",
      content: "lorepsuim isum lorepsuim isum",
    },
  ]);
});

app.use("/api", apiRouter);

function runServer() {
  console.log("Starting server");
  app.listen(PORT, () => {
    console.log(`The app is runnning on http://localhost:${PORT}`);
  });
}

module.exports = runServer;
