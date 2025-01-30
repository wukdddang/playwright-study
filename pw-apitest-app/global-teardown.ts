import { expect, request } from "@playwright/test";
import fs from "fs";

async function globalTeardown() {
  try {
    // 파일에서 slugId 읽기
    const testDataFile = ".auth/test-data.json";
    console.log("Reading test data file...");
    const testData = JSON.parse(fs.readFileSync(testDataFile, "utf-8"));
    const { slugId, accessToken } = testData;
    console.log("Slug ID:", slugId);

    const context = await request.newContext();
    console.log("Attempting to delete article...");
    const deleteArticleResponse = await context.delete(
      `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
      {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      }
    );

    console.log("Delete response status:", deleteArticleResponse.status());
    expect(deleteArticleResponse.status()).toEqual(204);
  } catch (error) {
    console.error("Error in globalTeardown:", error);
    throw error;
  }
}

export default globalTeardown;
