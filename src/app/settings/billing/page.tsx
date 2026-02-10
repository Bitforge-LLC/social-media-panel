"use client";

import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  useDisclosure,
} from "@Bitforge-LLC/ui";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { CheckoutForm } from "@/components/checkoutForm";
import { SettingsCard } from "@/components/settingsCard";
import { env } from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

const Billing = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container>
      <SettingsCard
        title="Billing"
        description="Payments for domains, add-ons, and other usage are made using the default card."
        info="At most, three credit cards can be added."
        Button={<Button onPress={onOpen}>Add Credit Card</Button>}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Add Credit Card</ModalHeader>
            <ModalBody>
              <Elements
                stripe={stripePromise}
                options={{
                  appearance: {
                    theme: "flat",
                  },
                  currency: "usd",
                  mode: "setup",
                  paymentMethodTypes: ["card"],
                }}
              >
                <CheckoutForm />
              </Elements>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Text size="xl">hello</Text>
      </SettingsCard>
    </Container>
  );
};

export default Billing;
