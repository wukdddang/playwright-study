import { expect, test as setup } from "@playwright/test";

setup("new new article", async ({ request }) => {
  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Likes test article",
          description: "test",
          body: "etset",
          tagList: [],
        },
      },
    }
  );

  expect(articleResponse.status()).toEqual(201);
  const response = await articleResponse.json();
  const slugId = response.article.slug;
  process.env["SLUG_ID"] = slugId;
});
