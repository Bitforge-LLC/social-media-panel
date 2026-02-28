"use client";

import { Button, Section, Image, Text } from "@Bitforge-LLC/ui";
import { FaCode, FaEthereum } from "@Bitforge-LLC/ui/icons/fa";
import { IoLogoVercel } from "@Bitforge-LLC/ui/icons/io5";
import { SiNextdotjs, SiSolana } from "@Bitforge-LLC/ui/icons/si";

const Home = () => {
  return (
    <Section className="gap-40 p-20">
      <Section>
        <Text size="xl" className="text-center">
          Stop with the setup. <br />
          Start writing code.
        </Text>

        <Text size="lg">One spot to setup all your apps infrastructure.</Text>
        <Section className="hug flex-row gap-4">
          <Button className="rounded-full" color="primary">
            Start Building
          </Button>
          <Button className="rounded-full" variant="bordered">
            idek bruh
          </Button>
        </Section>
        <Image
          src="/images/sample-screenshot.png"
          alt="screenshot"
          width={800}
        />
      </Section>
      <Section>
        <Text size="xl">
          Trusted by teams at over 1,000 of the world&apos;s leading
          organizations
        </Text>
        <Section className="hug flex-row gap-20">
          <SiSolana size={20} />
          <FaEthereum size={20} />
          <IoLogoVercel size={20} />
          <SiNextdotjs size={20} />
          <SiSolana size={20} />
          <FaEthereum size={20} />
          <IoLogoVercel size={20} />
          <SiNextdotjs size={20} />
        </Section>
      </Section>
      <Section>
        <Text size="xl" className="text-center">
          Features that work for your future.
        </Text>
        <Text size="lg">
          Check out our amazing features and experience the power of Vaultflow
          for yourself.
        </Text>
      </Section>
      <Section className="hug flex-row items-center justify-between p-10">
        <Section className="flex-1 gap-4">
          <Button className="" color="secondary" isIconOnly>
            <FaCode size={20} />
          </Button>
          <Text size="xl">Code collaboration</Text>
          <Text>
            Our advanced code synchronization technology ensures that your data
            is always up-to-date and accurate, no matter where it&apos;s coming
            from. Whether you&apos;re integrating data from multiple sources or
            working with a team of developers, our synchronization technology
            makes it easy to collaborate and ensure that your data is consistent
            and reliable.
          </Text>
        </Section>
        <Section>
          <Image src="/images/sample-code.png" alt="screenshot" width={400} />
        </Section>
      </Section>
      <Section className="hug gap-10 p-10 text-center">
        <Text size="xl">
          Our powerful analytics provides invaluable insights.
        </Text>
        <Text>
          Unlock the power of data with our cutting-edge analytics product. Get
          instant insights with our user-friendly Analytics Dashboard, and take
          advantage of our innovative digital credit tokens to reward your
          customers and incentivize engagement.
        </Text>
        <Button className="rounded-full" variant="bordered">
          Start building
        </Button>
      </Section>
    </Section>
  );
};

export default Home;
