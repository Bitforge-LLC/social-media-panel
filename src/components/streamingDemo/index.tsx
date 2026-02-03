"use client";

import { Button, Container, Progress, Text } from "@Bitforge-LLC/ui";
import { useCallback, useState } from "react";

import { useServer } from "@/lib/trpc/client";

type StreamingProgress = {
  message: string;
  step: number;
  taskName: string;
  total: number;
};

/**
 * Streaming Query Demo using React Query patterns.
 *
 * Uses tRPC's streaming query (async generator) with httpBatchStreamLink.
 * Data accumulates as an array in React Query's cache.
 *
 * - `data`: Array of yielded values, grows as stream progresses
 * - `status`: Standard React Query status
 * - `isFetching`: True while stream is active
 */
export const StreamingDemo = () => {
  const api = useServer();
  const [enabled, setEnabled] = useState(false);

  // Standard useQuery - data is an array that grows as chunks arrive
  const { data, error, isFetching } = api.example.streamingTask.useQuery(
    { taskName: "Demo Task" },
    {
      enabled,
      // Don't refetch on window focus during streaming
      refetchOnWindowFocus: false,
    }
  );

  const handleStart = useCallback(() => {
    setEnabled(true);
  }, []);

  const handleReset = useCallback(() => {
    setEnabled(false);
  }, []);

  // Get the latest progress from the array
  const progress = (data as StreamingProgress[] | undefined)?.at(-1);
  const isComplete = progress?.step === progress?.total;

  return (
    <Container className="hug items-start gap-4 p-4">
      <Container className="w-full flex-row items-center justify-between">
        <Container className="hug items-start">
          <Text size="base" className="font-semibold">
            Streaming Query Progress
          </Text>
          <Text size="sm" className="text-default-500">
            Real-time progress via httpBatchStreamLink + React Query
          </Text>
        </Container>
        <Container className="hug flex-row gap-2">
          {isComplete && (
            <Button color="default" variant="flat" onPress={handleReset}>
              Reset
            </Button>
          )}
          <Button
            color="primary"
            isDisabled={enabled}
            isLoading={isFetching}
            onPress={handleStart}
          >
            {isFetching ? "Streaming..." : "Start Task"}
          </Button>
        </Container>
      </Container>

      {progress && (
        <Container className="w-full items-start gap-2">
          <Container className="w-full flex-row justify-between text-sm">
            <Text className="font-medium">{progress.message}</Text>
            <Text className="text-default-500">
              Step {progress.step}/{progress.total}
            </Text>
          </Container>
          <Progress
            aria-label="Task progress"
            color={isComplete ? "success" : "primary"}
            value={(progress.step / progress.total) * 100}
          />
        </Container>
      )}

      {error && (
        <Text size="sm" className="text-danger">
          Error: {error.message}
        </Text>
      )}
    </Container>
  );
};
