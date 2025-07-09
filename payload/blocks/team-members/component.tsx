import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Media } from "@/components/fragments/media";

export async function TeamMembersBlock() {
  const payload = await getPayload({ config: configPromise });

  const teamMembers = await payload.find({
    collection: "team",
    depth: 1,
    limit: 0,
    overrideAccess: false,
  });

  console.log(teamMembers);

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {teamMembers.docs?.map((doc) => (
        <div
          key={doc.id}
          className="flex flex-col gap-6 items-center justify-start"
        >
          <div className="relative w-[80%] overflow-hidden aspect-square rounded-full bg-muted">
            <Media
              fill
              imgClassName="z-10 object-cover size-full"
              pictureClassName="size-full"
              priority
              resource={doc.headshot}
            />
          </div>
          <div className="flex flex-col gap-1 items-center text-center">
            <h3 className="text-3xl font-display font-medium text-primary">
              {doc.name}
            </h3>
            <p className="font-semibold">{doc.jobTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
