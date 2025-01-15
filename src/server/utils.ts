import { FormAttachment } from "@/types";
import axios from "axios";
import { and, eq } from "drizzle-orm";
import {
  surveyData,
  surveyAttachments,
  attachmentTypesEnum,
} from "./db/schema";

/**
 * Fetches survey submissions from ODK.
 *
 * @param {Object} params - The parameters for fetching survey submissions.
 * @param {string} params.siteEndpoint - The site endpoint URL.
 * @param {string} params.userName - The username for authentication.
 * @param {string} params.password - The password for authentication.
 * @param {string} params.odkFormId - The ODK form ID.
 * @param {number} params.odkProjectId - The ODK project ID.
 * @param {Array} params.attachmentPaths - The attachment paths.
 * @param {string} params.formId - The form ID.
 * @param {string} [params.startDate] - The start date for fetching submissions.
 * @param {string} [params.endDate] - The end date for fetching submissions.
 * @param {number} [params.count] - The number of submissions to fetch.
 * @param {Object} ctx - The context object.
 * @returns {Promise<void>} A promise that resolves when the submissions are fetched.
 */
export const fetchSurveySubmissions = async (
  {
    siteEndpoint,
    userName,
    password,
    odkFormId,
    odkProjectId,
    attachmentPaths,
    formId,
    startDate,
    endDate,
    count,
  }: {
    siteEndpoint: string;
    userName: string;
    password: string;
    odkFormId: string;
    odkProjectId: number;
    attachmentPaths: FormAttachment[];
    formId: string;
    startDate?: string;
    endDate?: string;
    count?: number;
  },
  ctx: any,
) => {
  const getODKToken = async (
    siteUrl: string,
    username: string,
    password: string,
  ) => {
    try {
      const response = await axios.post(`${siteUrl}/v1/sessions`, {
        email: username,
        password: password,
      });
      return response.data.token;
    } catch (error) {
      console.error("Error fetching ODK token:", error);
      throw new Error("Failed to fetch ODK token");
    }
  };

  const getValueFromNestedField = (data: any, fieldPath: string): any => {
    return fieldPath.split(".").reduce((acc, part) => {
      if (acc === undefined || acc === null) return undefined;

      const arrayIndexMatch = part.match(/(\w+)\[(\d+)\]/);

      if (arrayIndexMatch) {
        const [, property, index] = arrayIndexMatch;
        return acc[property][parseInt(index, 10)];
      }
      return acc[part];
    }, data);
  };

  const token = await getODKToken(siteEndpoint, userName, password);

  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 1);
  const defaultEndDate = new Date(today);

  const queryParams = {
    $top: count ?? 100,
    $skip: 0,
    $expand: "*",
    $count: true,
    $wkt: true,
  };

  try {
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
    const response = await axios.get(
      `${siteEndpoint}/v1/projects/${odkProjectId}/forms/${odkFormId}.svc/Submissions?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const submissions = response.data.value;
    for (let submission of submissions) {
      await ctx.db
        .insert(surveyData)
        .values({
          id: submission.__id,
          formId: formId,
          data: submission,
        })
        .onConflictDoNothing();

      if (attachmentPaths) {
        for (let attachmentPath of attachmentPaths) {
          const attachmentName = getValueFromNestedField(
            submission,
            attachmentPath.path,
          );

          if (attachmentName) {
            const existingAttachment = await ctx.db
              .select()
              .from(surveyAttachments)
              .where(
                and(
                  eq(surveyAttachments.dataId, submission.__id),
                  eq(surveyAttachments.name, attachmentName),
                ),
              )
              .limit(1);

            if (existingAttachment.length > 0) {
              console.log(
                `Attachment ${attachmentName} for submission ${submission.__id} already exists in the database.`,
              );
              continue;
            }

            const attachmentUrl = `${siteEndpoint}/v1/projects/${odkProjectId}/forms/${odkFormId}/submissions/${submission.__id}/attachments/${attachmentName}`;
            const attachment = await axios.get(attachmentUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            });

            if (!process.env.BUCKET_NAME)
              throw new Error("Bucket name not found");

            console.log("Sending object to minio", attachmentName);
            console.log(process.env.BUCKET_NAME, attachmentName);
            await ctx.minio.putObject(
              process.env.BUCKET_NAME,
              attachmentName,
              attachment.data,
            );

            await ctx.db
              .insert(surveyAttachments)
              .values({
                dataId: submission.__id,
                type: attachmentPath.type as (typeof attachmentTypesEnum.enumValues)[number],
                name: attachmentName,
              })
              .onConflictDoNothing();
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get submissions: ${(error as any).message}`);
  }
};
