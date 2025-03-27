import fs from "fs";
import jwt from "jsonwebtoken";

const data = fs.readFileSync("data.csv", "utf8");

data.split("\n").forEach((line) => {
  if (line.trim() === "") return;

  let [id, userId, accessToken, refreshToken] = line.split(",");

  accessToken = accessToken.trim().slice(1, -1);

  const result = jwt.decode(accessToken, { complete: true });
  if (!result) {
    console.error("error: cannot decode accessToken: ", accessToken);
  }

  const expire = new Date(result?.payload.exp * 1000);

  console.log(expire < Date.now());
});
