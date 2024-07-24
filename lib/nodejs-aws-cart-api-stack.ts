import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

import 'dotenv/config';

export class NodejsAwsCartApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cardApiLambda = new NodejsFunction(this, 'cardApiFunction', {
      runtime: Runtime.NODEJS_20_X,
      entry: 'nest/dist/main.js',
      handler: 'cardApiFunction',
      environment: {},
    });

    new LambdaRestApi(this, 'cardAPIGateway', {
      restApiName: 'CardAPIGateway',
      handler: cardApiLambda,
    });
  }
}
