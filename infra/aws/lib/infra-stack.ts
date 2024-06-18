import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class HirerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const accessLogsBucket = new s3.Bucket(this, "hirer-access-logs", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      bucketName: "hirer-access-logs",
      enforceSSL: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const assetsBucket = new s3.Bucket(this, "hirer-assets", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      bucketName: "hirer-assets",
      enforceSSL: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: accessLogsBucket,
      serverAccessLogsPrefix: "hirer-assets-logs/",
    });

    const privateBucket = new s3.Bucket(this, "hirer-private", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      bucketName: "hirer",
      enforceSSL: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: accessLogsBucket,
      serverAccessLogsPrefix: "hirer-private-logs/",
    });

    const distribution = new cloudfront.Distribution(
      this,
      "assets-distribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(assetsBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        enableLogging: true,
        logBucket: accessLogsBucket,
        domainNames: ["assets.hirer.so"],
        certificate: acm.Certificate.fromCertificateArn(
          this,
          "assets-certificate",
          `arn:aws:acm:us-east-1:${props?.env?.account}:certificate/09fa0b93-439d-4c1c-8c40-d5447e0606af`
        ),
        logFilePrefix: "assets-distribution-logs/",
      }
    );

    new cdk.CfnOutput(this, "distribution-domain-name", {
      value: distribution.distributionDomainName,
    });
  }
}
