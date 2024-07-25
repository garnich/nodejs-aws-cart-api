import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

import 'dotenv/config';

export class NodejsAwsCartApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cardApiLambda = new NodejsFunction(this, 'card-api-lambda', {
      runtime: Runtime.NODEJS_20_X,
      entry: 'nest/dist/main.js',
      environment: {},
      functionName: 'cardApiLambda',
      timeout: Duration.seconds(10),
    });

    new LambdaRestApi(this, 'cardAPIGateway', {
      restApiName: 'CardAPIGateway',
      handler: cardApiLambda,
    });
  }
}
