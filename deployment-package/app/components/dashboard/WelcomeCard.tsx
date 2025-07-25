import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";

interface WelcomeCardProps {
  onGetStarted?: () => void;
}

export default function WelcomeCard({ onGetStarted }: WelcomeCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <CardHeader>
        <h3 className="text-xl font-bold text-white">
          Welcome to FounderConnect!
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-white/90 mb-4">
          To get started, please complete your profile so you can connect with
          other founders.
        </p>
        <Button
          onClick={onGetStarted || (() => {})}
          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
        >
          Complete Profile
        </Button>
      </CardContent>
    </Card>
  );
}
