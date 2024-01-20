"use client";

import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="text-xl">{icon}</div>
      <div>
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface FeatureModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FeatureModal: React.FC<FeatureModalProps> = ({ open, setOpen }) => {
  return (
    <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Elevate Your Hiring Experience!</AlertDialogTitle>
          <div className="text-zinc-700 text-sm">
            Get ready to revolutionize your interview process with Hirer
            interviews. This innovative tool brings the power of AI directly
            into your hiring sessions, ensuring a more efficient and insightful
            experience.
          </div>
          <div className="py-3 flex gap-3 flex-col">
            <Feature
              icon="📝"
              title="AI-Driven Note-Taking"
              description="Never miss a detail! Our AI system meticulously captures key points from each interview, allowing you to focus fully on the candidate."
            />
            <Feature
              icon="🤔"
              title="Smart Question Suggestions"
              description="Unsure what to ask next? Let AI assist you with context-relevant, tailored questions that delve deeper into candidates' skills and potential."
            />
            <Feature
              icon="🛡️"
              title="Bias-Reduced Assessments"
              description="Our sophisticated algorithms help mitigate unconscious biases, promoting a fair and inclusive evaluation process."
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeatureModal;
