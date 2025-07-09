import { StatBlock } from "@/payload/blocks/stats/component";

type CommunityFeaturesStatsProps = {
  features: {
    featureOne: string;
    featureTwo: string;
    featureThree: string;
  };
  fund: string;
  yearAcquired: string;
  units: string;
};

export function CommunityFeaturesStats({
  features,
  fund,
  yearAcquired,
  units,
}: CommunityFeaturesStatsProps) {
  return (
    <div className="container flex flex-col gap-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureBlock title={features.featureOne} />
        <FeatureBlock title={features.featureTwo} />
        <FeatureBlock title={features.featureThree} />
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <StatBlock
          className="flex-1 bg-primary"
          title={fund}
          subTitle="Fund Number"
        />
        <StatBlock
          className="bg-secondary"
          title={yearAcquired}
          subTitle="Year Acquired"
        />
        <StatBlock className="bg-accent" title={units} subTitle="Total Units" />
      </div>
    </div>
  );
}

function FeatureBlock({ title }: { title: string }) {
  return (
    <div className="p-6 sm:p-10 flex flex-col gap-1 items-start justify-center text-primary-foreground bg-muted">
      <div className="font-display text-3xl font-medium text-primary">
        {title}
      </div>
    </div>
  );
}
