#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Aspects } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import "source-map-support/register";
import { HirerStack } from "../lib/infra-stack";

const app = new cdk.App();
new HirerStack(app, "HirerStack", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  terminationProtection: true,
});
Aspects.of(app).add(new AwsSolutionsChecks());
