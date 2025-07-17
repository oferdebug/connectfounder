import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";

interface WelcomeCardProps {
  onGetStarted: () => void;
}

export default function WelcomeCard({ onGetStarted }: WelcomeCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-bold text-blue-700">Welcome to FounderConnect!</h3>
      </CardHeader>
      <CardContent>
        <p className="text-blue-700 mb-4">
          To get started, please complete your profile so you can connect with other founders.
        </p>
        <Button onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700 text-white">
          Complete Profile
        </Button>
      </CardContent>
    </Card>
  );
}
