import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { NotFoundError, sql } from "slonik";
import { pool } from "./database";
import { verify } from "./routes/auth/authUtils/verify";
import { login } from "./routes/auth/login";
import { logout } from "./routes/auth/logout";
import { registerWithToken } from "./routes/auth/registerWithToken";
import getPreview from "./routes/campaign/getPreview";
import getReceipnent from "./routes/campaign/getReceipnent";
import addCVideoToRenderQueue from "./routes/create/addCVideoToRenderQueue";
import createProject from "./routes/create/createProject";
import getExports from "./routes/create/getExports";
import getOrganization from "./routes/create/getOrganization";
import getProject from "./routes/create/getProject";
import getProjects from "./routes/create/getProjects";
import deleteProject from "./routes/create/project/deleteProject";
import renameProject from "./routes/create/project/renameProject";
import resetExportJobTaskField from "./routes/create/resetExportJobTaskField";
import getSRT from "./routes/create/subtitles/getSRT";
import getVTT from "./routes/create/subtitles/getVTT";
import updateProject from "./routes/create/updateProject";
import demoVideo from "./routes/demo/demoVideo";
import getFaces from "./routes/demo/getFaces";
import getGenVideos from "./routes/demo/getGenVideos";
import gptResponse from "./routes/demo/gptResponse";
import uploadFace from "./routes/demo/uploadFace";
import getVoice from "./routes/getVoice";
import { imagesFromPDF } from "./routes/imagesFromPDF";
import addJob from "./routes/moduleJobs/addJob";
import getJob from "./routes/moduleJobs/getJob";
import getJobs from "./routes/moduleJobs/getJobs";
import getModules from "./routes/moduleJobs/getModules";
import resetChild from "./routes/moduleJobs/resetChild";
import runJob from "./routes/moduleJobs/runJob";
import { checkout } from "./routes/money/checkout";
import { stripeWebhook } from "./routes/money/stripe-webhook";
import submitText from "./routes/submitText";
import { createInvite } from "./routes/users/inviteToken/createInvite";
import { getToken } from "./routes/users/inviteToken/getToken";
import { getErrorMessage } from "./utils/getErrorMessage";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:1234",
      "http://localhost:3000",
      "http://localhost:8888",
      "http://horse.loc:3000",
      "http://horse.loc:8888",
      "http://papop.local:3000",
      "https://personate.ai",
      "https://natto.dev/",
      "https://natto.bypaulshen.com",
    ],
  })
);

app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: "purple-rain",
    region: "us-east-1", //optional
    signatureVersion: "v4", //optional (use for some amazon regions: frankfurt and others)
    signatureExpires: 60, //optional, number of seconds the upload signed URL should be valid for (defaults to 60)
    ACL: "public-read", // this is default
    uniquePrefix: true, // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);

app.use(express.static("public"));

app.use(
  "/gen-video",
  express.static("public/videos", {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "max-age=31536000");
    },
  })
);

app.use(
  bodyParser.json({
    limit: '200mb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/test", async (req, res) => {
  pool.query("SELECT * FROM jobs").then((hey) => {
    res.send({ jobs: hey.rows });
  });
});

app.post("/mockai", async (req, res) => {
  console.log("mock received: ", req.body);
  res.send("");
});

app.get("/sharePage/:shareId", async (req, res, next) => {
  console.log("req.params.shareId: ", req.params.shareId);
  const sharePage = await pool.one(
    sql`SELECT id,video_url,text from videos where id=${req.params.shareId}`
  );
  if (!sharePage) {
    next();
    return;
  }
  res.send(sharePage);
});

app.get("/getSharePages", async (req, res, next) => {
  const sharePages = await getAll(`SELECT * from videos`);
  res.send(sharePages);
});

app.get("/campaign/:cId/:rId", getReceipnent);
app.get("/campaign/:cId/:rId/getPreview", getPreview);

app.post("/submitText", submitText);

app.post("/getVoice", getVoice);

app.post("/money/checkout", checkout);
app.post("/money/stripe-webhook", stripeWebhook);

// user
app.get("/auth/user", verify("optional"), async (req, res) => {
  if (req.user) {
    res.send({
      authenticated: true,
      user: req.user,
    });
  } else {
    res.send({
      authenticated: false,
    });
  }
});

app.post("/auth/login", login);
app.get("/auth/logout", logout);
app.post("/auth/registerWithToken", registerWithToken);

app.post("/utils/imagesFromPDF", verify("normal"), imagesFromPDF);

app.post("/create/createProject", verify("normal"), createProject);
app.post(
  "/create/:org/updateProject/:projectId",
  verify("normal"),
  updateProject
);

app.get("/create/getExports/:projectId", verify("normal"), getExports);
app.get("/create/getExports", verify("normal"), getExports);
app.post(
  "/create/resetExportJobTaskField/:jobId",
  verify("normal"),
  resetExportJobTaskField
);
app.get("/create/getOrg/:org", verify("normal"), getOrganization);
app.get("/create/:org/projects", verify("normal"), getProjects);
app.get("/create/:org/project/:projectId", verify("normal"), getProject);
app.get("/create/project/:projectId/subtitle.srt", verify("normal"), getSRT);
app.get("/create/project/:projectId/subtitle.vtt", verify("normal"), getVTT);
app.post(
  "/create/:org/project/:projectId/rename",
  verify("normal"),
  renameProject
);
app.delete(
  "/create/:org/project/:projectId/delete",
  verify("normal"),
  deleteProject
);

app.post(
  "/create/addVideoToRenderQueue/:projectId",
  verify("normal"),
  addCVideoToRenderQueue
);

app.post("/users/inviteToken/createInvite", verify("normal"), createInvite);
app.get("/users/inviteToken/getToken/:tokenString", getToken);

app.get("/moduleJobs/getModules", verify("normal"), getModules);
app.get("/moduleJobs/getJobs", verify("normal"), getJobs);
app.get("/moduleJobs/getJob/:jobId", verify("optional"), getJob);
app.post("/moduleJobs/addJob", verify("optional"), addJob);
app.post("/moduleJobs/runJob", verify("optional"), runJob);
app.post("/moduleJobs/resetChild", verify("optional"), resetChild);

app.post("/demo/demoVideo", demoVideo);
app.post("/demo/gptResponse", gptResponse);
app.post("/demo/uploadFace", uploadFace);
app.get("/demo/getFaces", getFaces);
app.get("/demo/getGenVideos/:faceId", getGenVideos);

app.all("/*", (req, res) => {
  return res.status(404).send({
    message: "Route not found",
  });
});

app.use(function (err, req, res, next) {
  console.error(err);

  if (err instanceof NotFoundError) {
    res.status(404).send({
      message: `${err.message}`,
    });
  } else {
    res.status(500).send({
      message: getErrorMessage(err),
    });
  }
});

export default app;
