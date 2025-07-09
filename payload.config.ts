import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import path from "path";
import { Header } from "@/payload/globals/header/config";
import { Pages } from "@/payload/collections/pages/config";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { getServerSideURL } from "@/payload/utilities/get-url";
import { Media } from "@/payload/collections/media";
import { Footer } from "@/payload/globals/footer/config";
import { plugins } from "@/payload/plugins";
import { Communities } from "@/payload/collections/communities/config";
import { Team } from "@/payload/collections/team/config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Pages, Communities, Media, Team],

  globals: [Header, Footer],

  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",

  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
