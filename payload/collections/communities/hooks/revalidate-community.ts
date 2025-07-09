import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { Community } from "@/payload-types";

export const revalidateCommunity: CollectionAfterChangeHook<Community> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/communities/${doc.slug}`;

      payload.logger.info(`Revalidating community at path: ${path}`);

      revalidatePath(path);
      revalidateTag("communities-sitemap");
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/communities/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old community at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag("communities-sitemap");
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Community> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/communities/${doc?.slug}`;

    revalidatePath(path);
    revalidateTag("communities-sitemap");
  }

  return doc;
};
