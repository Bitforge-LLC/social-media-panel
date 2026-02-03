"use client";

import {
  Animate,
  Button,
  Card,
  CardBody,
  Container,
  Text,
  toast,
} from "@Bitforge-LLC/ui";
import { Fa, Io5, Si } from "@Bitforge-LLC/ui/icons";
import { useCallback } from "react";

const TestPage = () => {
  const handleSuccess = useCallback(() => {
    toast.success("This is a success message", "Success");
  }, []);

  const handleError = useCallback(() => {
    toast.error("This is an error message", "Error");
  }, []);

  const handleWarning = useCallback(() => {
    toast.warning("This is a warning message", "Warning");
  }, []);

  const handleInfo = useCallback(() => {
    toast.info("This is an info message", "Info");
  }, []);

  return (
    <>
      {/* Icon Animations */}
      <Text size="xl">Icon Animations</Text>
      <Text size="base">Icons have built-in hover animations</Text>
      <Container className="flex-row flex-wrap gap-6">
        <Fa.FaGithub size={32} />
        <Fa.FaHeart size={32} color="#f31260" />
        <Fa.FaStar size={32} color="#f5a524" />
        <Io5.IoRocket size={32} color="#006fee" />
        <Io5.IoSettings size={32} />
        <Si.SiNextdotjs size={32} />
        <Si.SiReact size={32} color="#61dafb" />
        <Si.SiTypescript size={32} color="#3178c6" />
      </Container>

      {/* Hover Effects */}
      <Text size="xl">Hover Effects</Text>
      <Text size="base">Micro-interaction feedback</Text>
      <Container className="flex-row flex-wrap gap-4">
        <Animate hover="pop">
          <Card className="w-32">
            <CardBody className="text-center">
              <Text size="sm">Pop</Text>
            </CardBody>
          </Card>
        </Animate>

        <Animate hover="jiggle">
          <Card className="w-32">
            <CardBody className="text-center">
              <Text size="sm">Jiggle</Text>
            </CardBody>
          </Card>
        </Animate>
      </Container>

      {/* Entrance Effects */}
      <Text size="xl">Entrance Effects</Text>
      <Text size="base">Reveal animations when scrolling into view</Text>
      <Container className="flex-row flex-wrap gap-4">
        <Animate entrance="fadeUp">
          <Card className="w-32">
            <CardBody className="text-center">
              <Text size="sm">Fade Up</Text>
            </CardBody>
          </Card>
        </Animate>

        <Animate entrance="fadeIn">
          <Card className="w-32">
            <CardBody className="text-center">
              <Text size="sm">Fade In</Text>
            </CardBody>
          </Card>
        </Animate>

        <Animate entrance="scaleIn">
          <Card className="w-32">
            <CardBody className="text-center">
              <Text size="sm">Scale In</Text>
            </CardBody>
          </Card>
        </Animate>
      </Container>

      {/* Staggered Entrance */}
      <Text size="xl">Staggered Entrance</Text>
      <Text size="base">Multiple children auto-stagger</Text>
      <Animate entrance="fadeUp" className="flex flex-row gap-4">
        <Card className="w-24">
          <CardBody className="text-center">
            <Text size="sm">1</Text>
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Text size="sm">2</Text>
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Text size="sm">3</Text>
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Text size="sm">4</Text>
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Text size="sm">5</Text>
          </CardBody>
        </Card>
      </Animate>

      {/* Scale In Stagger */}
      <Text size="xl">Scale In Stagger</Text>
      <Animate entrance="scaleIn" className="flex flex-row gap-4">
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoStar size={24} color="#f5a524" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoStar size={24} color="#f5a524" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoStar size={24} color="#f5a524" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoStar size={24} color="#f5a524" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoStar size={24} color="#f5a524" />
          </CardBody>
        </Card>
      </Animate>

      {/* Repeat on Scroll */}
      <Text size="xl">Repeat on Scroll</Text>
      <Text size="base">Scroll past and back to see animation repeat</Text>
      <Animate
        entrance="scaleIn"
        delay={0.1}
        repeat
        className="flex flex-row gap-4"
      >
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoRefresh size={24} color="#006fee" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoRefresh size={24} color="#006fee" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoRefresh size={24} color="#006fee" />
          </CardBody>
        </Card>
      </Animate>

      {/* Combined: Entrance + Hover */}
      <Text size="xl">Combined Effects</Text>
      <Text size="base">Entrance animation with hover interaction</Text>
      <Animate entrance="scaleIn" hover="pop" className="flex flex-row gap-4">
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoHeart size={24} color="#f31260" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoHeart size={24} color="#f31260" />
          </CardBody>
        </Card>
        <Card className="w-24">
          <CardBody className="text-center">
            <Io5.IoHeart size={24} color="#f31260" />
          </CardBody>
        </Card>
      </Animate>

      {/* Animated Buttons */}
      <Text size="xl">Animated Buttons</Text>
      <Container className="flex-row flex-wrap gap-4">
        <Animate hover="pop">
          <Button color="primary">Pop</Button>
        </Animate>
        <Animate hover="jiggle">
          <Button color="secondary">Jiggle</Button>
        </Animate>
      </Container>

      {/* Toast Test */}
      <Text size="xl">Toast Test</Text>
      <Container className="flex-row">
        <Button color="success" variant="solid" onPress={handleSuccess}>
          Success Toast
        </Button>
        <Button color="danger" variant="solid" onPress={handleError}>
          Error Toast
        </Button>
        <Button color="warning" variant="solid" onPress={handleWarning}>
          Warning Toast
        </Button>
        <Button color="primary" variant="solid" onPress={handleInfo}>
          Info Toast
        </Button>
      </Container>
    </>
  );
};

export default TestPage;
