"use client";

import { Button, Container, Image, Text } from "@Bitforge-LLC/ui";
import Fa from "@Bitforge-LLC/ui/icons/fa";
import Io5 from "@Bitforge-LLC/ui/icons/io5";
import Si from "@Bitforge-LLC/ui/icons/si";

const Home = () => {
  return (
    <Container className="gap-40 p-20">
      <Container>
        <Text size="xl" className="text-center">
          Stop with the setup. <br />
          Start writing code.
        </Text>

        <Text size="lg">One spot to setup all your apps infrastructure.</Text>
        <Container className="hug flex-row gap-4">
          <Button className="rounded-full" color="primary">
            Start Building
          </Button>
          <Button className="rounded-full" variant="bordered">
            idek bruh
          </Button>
        </Container>
        <Image
          src="/images/sample-screenshot.png"
          alt="screenshot"
          width={800}
        />
      </Container>
      <Container>
        <Text size="xl">
          Trusted by teams at over 1,000 of the world&apos;s leading
          organizations
        </Text>
        <Container className="hug flex-row gap-20">
          <Si.SiSolana size={20} />
          <Fa.FaEthereum size={20} />
          <Io5.IoLogoVercel size={20} />
          <Si.SiNextdotjs size={20} />
          <Si.SiSolana size={20} />
          <Fa.FaEthereum size={20} />
          <Io5.IoLogoVercel size={20} />
          <Si.SiNextdotjs size={20} />
        </Container>
      </Container>
      <Container>
        <Text size="xl" className="text-center">
          Features that work for your future.
        </Text>
        <Text size="lg">
          Check out our amazing features and experience the power of Vaultflow
          for yourself.
        </Text>
      </Container>
      <Container className="hug flex-row items-center justify-between p-10">
        <Container className="flex-1 gap-4">
          <Button className="" color="secondary" isIconOnly>
            <Fa.FaCode size={20} />
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
        </Container>
        <Container>
          <Image src="/images/sample-code.png" alt="screenshot" width={400} />
        </Container>
      </Container>
      <Container className="hug gap-10 p-10 text-center">
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
      </Container>
    </Container>
  );
};

export default Home;
