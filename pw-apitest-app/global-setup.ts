import { request } from "@playwright/test";
import user from "./.auth/user.json";
import fs from "fs";
import { expect } from "@playwright/test";

const authFile = ".auth/user.json";
const testDataFile = ".auth/test-data.json";

async function globalSetup() {
  const context = await request.newContext();

  const responseToken = await context.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "pwtest12341234@test.com",
          password: "pwtest12341234",
        },
      },
    }
  );

  const responseBody = await responseToken.json();
  const accessToken = responseBody.user.token;

  user.origins[0].localStorage[0].value = accessToken;

  fs.writeFileSync(authFile, JSON.stringify(user));

  process.env["ACCESS_TOKEN"] = accessToken;

  const articleResponse = await context.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Global Likes test article",
          description: "test",
          body: "etset",
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(articleResponse.status()).toEqual(201);
  const response = await articleResponse.json();
  const slugId = response.article.slug;

  fs.writeFileSync(testDataFile, JSON.stringify({ slugId, accessToken }));
}

export default globalSetup;
