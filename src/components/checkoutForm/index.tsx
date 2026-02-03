"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { Button } from "@Bitforge-LLC/ui";
import { type FormEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { env } from "@/env";

const logPaymentSuccess = (paymentMethod: unknown): void => {
  if (env.NODE_ENV === "development") {
    console.warn("Payment method saved:", paymentMethod);
  }
};

const handleElementsSubmit = async (
  elements: StripeElements
): Promise<boolean> => {
  const { error: submitError } = await elements.submit();

  if (submitError) {
    console.error(submitError);
    return false;
  }

  return true;
};

const handleStripeConfirmation = async (
  stripe: Stripe,
  elements: StripeElements,
  clientSecret: string
): Promise<boolean> => {
  const { error: stripeError, setupIntent } = await stripe.confirmSetup({
    clientSecret,
    elements,
    redirect: "if_required",
  });

  if (stripeError) {
    console.error(stripeError);
    return false;
  }

  if (setupIntent?.payment_method) {
    logPaymentSuccess(setupIntent.payment_method);
  }

  return true;
};

const processPayment = async (
  stripe: Stripe,
  elements: StripeElements,
  clientSecret: string
): Promise<void> => {
  const submitSuccess = await handleElementsSubmit(elements);

  // Only attempt confirmation if submission succeeded
  if (submitSuccess) {
    await handleStripeConfirmation(stripe, elements, clientSecret);
  }

  // Errors are already logged in helper functions
  return Promise.resolve();
};

const CheckoutForm = () => {
  // Commented out until trpc is properly configured
  // const { data: clientSecret } = trpc.payment.createSetupIntent.useQuery(
  //   undefined,
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // Placeholder for development
  const clientSecret = undefined;

  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (): Promise<void> => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);

    try {
      await processPayment(stripe, elements, clientSecret);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [clientSecret, elements, stripe]);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      void handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit]
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {clientSecret && <PaymentElement />}
      <Button
        type="submit"
        isLoading={loading}
        color="primary"
        className="w-full"
      >
        Add Payment Method
      </Button>
    </form>
  );
};

export { CheckoutForm };
