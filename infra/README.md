
# Welcome to your CDK Python project!

This is a project for CDK development with Python.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

This project is set up like a standard Python project using `pipenv` to manage virtual env and dependencies, and use `npm` to manage `cdk` as a development dependency inside this project. You can install this project by following code.

```
# install python
$ pipenv shell
$ pipenv install --dev

# install npm
$ npm install

# bootstrap cdk
# make sure you have issued a valid session credentials for your aws cli before running cdk commands
# run with the default aws cli profile
$ npm run cdk bootstrap ${ACCOUNT}/${REGION} -- --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
# run with aws a specified cli profile
$ npm run cdk bootstrap ${ACCOUNT}/${REGION} -- --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --profile my_aws_profile
```

You can now synthesize and deploy the CloudFormation template for this code.

```
# clear cdk.out
$ rm -rf cdk.out
# run with the default aws cli profile
$ npm run cdk synth
$ npm run cdk deploy
# run with a specified aws cli profile
$ npm run cdk synth -- --profile my_aws_profile
$ npm run cdk deploy -- --profile my_aws_profile
```


## How to Develop

### Install

#### Install pipenv, npm and bootstrap cdk
```
$ pipenv install --dev
$ npm install

# bootstrap cdk

# make sure you have issued a valid session credentials for your aws cli before running cdk commands
# check ./scripts/aws_cli_token_generator.sh for helps

# boostrap the cdk with the default aws cli profile
bash ./scripts/aws_cdk_bootstrap.sh
# boostrap the cdk with a specified aws cli profile
bash ./scripts/aws_cdk_bootstrap.sh -p my_aws_profile
```

#### Configure local development .env file
copy `.env` file and rename it as `.env.local`, then edit the environment variables as you like

### Generate Cloudformation Templates
Cloudformation Template files are saved in `cdk.out` folder

```
$ npm run cdk:clear
# synthesize with the default aws cli profile
$ npm run cdk:synth
# synthesize with a specified aws cli profile
$ npm run cdk:synth -- --profile my_aws_profile
```

### Deploy Cloudformation Templates from local
You can deploy the generated `cdk.out` from local to AWS with following commands

```
# deploy with the default aws cli profile
$ npm run cdk:deploy
# deploy with a specified aws cli profile
$ npm run cdk:deploy -- --profile my_aws_profile
```

### Deploy Cloudformation Templates by AWS CodePipeline
Run the AWS CodePipeline for your target stage directly

### Lint and Format
```
$ pipenv run lint
$ pipenv run format

# or just run 1 command to run both lint and format
$ pipenv run precommit
```

### Test
```
$ pipenv run test
```


## Useful commands

 * `cdk bootstrap`   deploy the cdk toolkit stack into your default AWS account/region
 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

Enjoy!
