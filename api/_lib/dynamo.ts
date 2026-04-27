import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import type { PortfolioData, SectionKey } from "../../shared/types/portfolio";

const TABLE = process.env.DYNAMODB_TABLE ?? "portfolio-data";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export async function getSection<K extends SectionKey>(
  key: K
): Promise<PortfolioData[K] | null> {
  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE,
        Key: { pk: "PORTFOLIO", sk: key.toUpperCase() },
      })
    );
    if (!result.Item) return null;
    return result.Item.data as PortfolioData[K];
  } catch {
    return null;
  }
}

export async function putSection<K extends SectionKey>(
  key: K,
  data: PortfolioData[K]
): Promise<boolean> {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          pk: "PORTFOLIO",
          sk: key.toUpperCase(),
          data,
          updatedAt: new Date().toISOString(),
        },
      })
    );
    return true;
  } catch {
    return false;
  }
}
