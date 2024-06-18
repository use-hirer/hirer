#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Aspects } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import "source-map-support/register";
import { HirerStack } from "../lib/infra-stack";

const app = new cdk.App();
new HirerStack(app, "HirerStack", {
  env: {
    region: process.env.AWS_REGION,
    account: process.env.AWS_ACCOUNT_ID,
  },
  terminationProtection: true,
});

Aspects.of(app).add(new AwsSolutionsChecks());
