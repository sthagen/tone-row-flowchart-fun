import { t, Trans } from "@lingui/macro";
import { CheckCircle } from "phosphor-react";
import { ReactNode } from "react";

import { SignUpForm } from "../components/SignUpForm";
import { Box } from "../slang";
import { SectionTitle } from "../ui/Typography";
import styles from "./Pricing.module.css";
export default function Pricing() {
  return (
    <Box content="start stretch">
      <Box py={8} px={5} className={styles.banner}>
        <Box className={styles.container} gap={8}>
          <Box gap={6} className="left" items="start">
            <p className="text-4xl font-bold">
              <Trans>
                Make your workflow easier with Flowchart Fun Pro– subscribe now
                for only $3/month or $30/year!
              </Trans>
            </p>
          </Box>
          <div className={styles.video}>
            <video autoPlay loop muted playsInline>
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </Box>
      </Box>
      <Box className={styles.plans} py={8} px={5}>
        <Box className={styles.container} gap={10}>
          <div className={styles.plans_content}>
            <Plan
              className={styles.Free}
              title="Free"
              features={[
                t`Temporary Flowcharts`,
                t`Image Export`,
                `8 ${t`Auto-Layouts`}`,
                t`One-time Share Links`,
              ]}
            />
            <Plan
              className={styles.BecomeAPro}
              title="Flowchart Fun Pro"
              features={[
                t`Everything in Free`,
                t`Persistent Flowcharts`,
                t`Remove Image Watermark`,
                t`Export High-Resolution Images`,
                t`Export to SVG`,
                t`Import from Lucidchart, Visio, and other CSV files`,
                `13 ${t`Auto-Layouts`}`,
                t`Permalinks`,
                t`Custom Sharing Options`,
                t`Create Flowcharts from a Prompt with AI`,
                t`One-on-One Support`,
                t`Office Hours`,
              ]}
              right={<SignUpForm />}
            />
          </div>
        </Box>
      </Box>
      <Box as="section" px={4}>
        <Box className={styles.featureBlock}>
          <Box className={styles.text} gap={3}>
            <SectionTitle>
              <Trans>Persistent Flowcharts</Trans>
            </SectionTitle>
            <SubsectionDescription>
              <Trans>
                With the ability to create unlimited hosted charts, you can
                access and work on your flowcharts from any device, anywhere.
              </Trans>
            </SubsectionDescription>
          </Box>
          <div className="right">
            <img src="/images/iphone_hand.svg" alt="Hand Holding Iphone" />
          </div>
        </Box>
      </Box>
      <Box as="section" px={4}>
        <Box className={styles.featureBlock}>
          <Box className={styles.text} gap={3}>
            <SectionTitle>
              <Trans>Custom Sharing Options</Trans>
            </SectionTitle>
            <SubsectionDescription>
              <Trans>
                Choose to share your charts with full access, edit-only, or
                view-only permissions, giving you control over who can make
                changes to your work.
              </Trans>
            </SubsectionDescription>
          </Box>
          <div className="right">
            <img src="/images/whiteboard_lady.svg" alt="Hand Holding Iphone" />
          </div>
        </Box>
      </Box>
      <Box className={styles.footerBlock} px={5} py={24}>
        <Box className={styles.container} gap={6} items="normal center">
          <p className="text-3xl font-bold">
            <Trans>
              Streamline your workflow and simplify your process visualization
              with Flowchart Fun
            </Trans>
          </p>
        </Box>
      </Box>
    </Box>
  );
}

function Plan({
  title,
  features,
  right,
  className = "",
}: {
  title: string;
  features: string[];
  hash?: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <Box
      className={[styles.plan, className].join(" ")}
      gap={4}
      p={8}
      pt={7}
      rad={5}
      items="start"
    >
      <SectionTitle>{title}</SectionTitle>
      <div className={right ? styles.planLeftRight : ""}>
        <div className="grid gap-1">
          {features.map((feature) => (
            <Box
              key={feature}
              gap={2}
              flow="column"
              content="start"
              items="center"
            >
              <CheckCircle size={24} weight="bold" color="var(--plus-color)" />
              <span className="text-sm leading-normal opacity-80">
                {feature}
              </span>
            </Box>
          ))}
        </div>
        {right}
      </div>
    </Box>
  );
}

function SubsectionDescription({ children }: { children: ReactNode }) {
  return <p className="text-base leading-tight opacity-80">{children}</p>;
}
