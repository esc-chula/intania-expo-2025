import fs from "fs";
import jwt from "jsonwebtoken";

const data = fs.readFileSync("checkExpiredToken/data.csv", "utf8");

let expiredToken = 0;
let totalToken = 0;

data.split("\n").forEach((line) => {
  if (line.trim() === "") return;

  let [id, userId, accessToken, refreshToken] = line.split(",");

  refreshToken = refreshToken.trim().slice(1, -1);

  const result = jwt.decode(refreshToken, { complete: true });
  if (!result) {
    console.error("error: cannot decode refreshToken: ", refreshToken);
    return;
  }

  if (typeof result.payload === "string") {
    console.error(
      "error: expect refreshToken payload to not be token: ",
      refreshToken,
    );
    return;
  }

  if (!result.payload.exp) {
    console.error("error: result.payload.exp is undefined");
    return;
  }

  const expiredDate = new Date(result.payload.exp * 1000);
  const nowDate = new Date();

  // console.log(expiredDate < nowDate);
  if (expiredDate < nowDate) {
    expiredToken++;
  }
  totalToken++;
});

console.log("total expired tokens: ", expiredToken);
console.log("total tokens: ", totalToken);
