"use client";

import { Button, Container, Divider } from "@Bitforge-LLC/ui";

import { SettingsCard } from "@/components/settingsCard";

const Settings = () => {
  return (
    <Container className="gap-4">
      <SettingsCard
        title="Avatar"
        description="This is your avatar.
Click on the avatar to upload a custom one from your files."
        info="An avatar is optional but strongly recommended."
      />

      <SettingsCard
        title="Display Name"
        description="Please enter your full name, or a display name you are comfortable with."
        info="Please use 32 characters at maximum."
      />
      <SettingsCard
        title="Email"
        description="
  Enter the email addresses you want to use to log in with Vercel. Your primary email will be used for account-related notifications."
        info="Emails must be verified to be able to login with them or be used as
          primary email."
      >
        <Divider />
      </SettingsCard>
      <SettingsCard
        title="Delete Account"
        description="Permanently remove your Personal Account and all of its contents from the Vercel platform. This action is not reversible, so please continue with caution."
      >
        <Button>Delete Account</Button>
      </SettingsCard>
    </Container>
  );
};

export default Settings;
