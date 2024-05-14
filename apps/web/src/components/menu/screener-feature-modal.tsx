"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@hirer/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

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

interface ScreenerFeatureModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ScreenerFeatureModal: React.FC<ScreenerFeatureModalProps> = ({
  open,
  setOpen,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Automate your screening process!</AlertDialogTitle>
          <div className="text-zinc-700 text-sm"></div>
          <div className="py-3 flex gap-3 flex-col">
            <Feature
              icon="🎥"
              title="Seamless Video Interviews"
              description="Conduct engaging, one-way video interviews with ease. Candidates can showcase their skills and personality on their own time."
            />
            <Feature
              icon="🧠"
              title="Intelligent Evaluation"
              description="Our AI-powered system analyzes candidate responses, providing you with valuable insights and recommendations for making informed decisions."
            />
            <Feature
              icon="⏰"
              title="Time-Saving Efficiency"
              description="Streamline your screening process and save countless hours. Focus on top-tier candidates who demonstrate the most potential."
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

export default ScreenerFeatureModal;
