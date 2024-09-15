#!/bin/sh
# format code by shfmt

set -e

PYTHON_VERION=$(python --version)
if [ $? -ne 0 ]; then
  echo "python is not installed; exit"
  exit 1
else
  echo "using python: $PYTHON_VERION"
fi

PIPENV_VERION=$(pipenv --version)
if [ $? -ne 0 ]; then
  echo "pipenv is not installed; exit"
  exit 1
else
  echo "using pipenv: $PIPENV_VERION"
fi

NPM_VERION=$(npm --version)
if [ $? -ne 0 ]; then
  echo "npm is not installed; exit"
  exit 1
else
  echo "using npm: $NPM_VERION"
fi

AWS_CLI_VERION=$(aws --version)
if [ $? -ne 0 ]; then
  echo "aws cli is not installed; exit"
  exit 1
else
  echo "using aws cli: $AWS_CLI_VERION"
fi

PROFILE=""
while getopts "p:h" optname; do
  case "$optname" in
  "p")
    PROFILE=$OPTARG
    echo "get option -p(profile), value is $PROFILE"
    ;;
  "h")
    echo "usage: ./aws_cdk_bootstrap.sh [-h] [-p {profile name}]"
    echo "positional arguments:"
    echo "  -p      AWS Credential Profile used in commands"
    echo "  -h      Show this help message and exit"
    exit
    ;;
  esac
done

SCRIPT_DIR="$(realpath "$(dirname "$BASH_SOURCE")")"

echo "enter script folder: $SCRIPT_DIR"
cd $SCRIPT_DIR

echo "install infra ..."
pipenv install
npm install

echo "handle aws environment variable ..."
if [[ ! -z "$CODEBUILD_BUILD_ARN" ]]; then
  AWS_ACCOUNT=$(echo $CODEBUILD_BUILD_ARN | cut -f5 -d ':')
elif [[ ! -z "$PROFILE" ]]; then
  AWS_REGION=$(aws configure get region --profile $PROFILE)
  AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text --profile $PROFILE)
else
  AWS_REGION=$(aws configure get region)
  AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
fi
echo "  - aws account: $AWS_ACCOUNT"
echo "  - aws region:  $AWS_REGION"

echo ""
echo "------------------------------"
echo "bootstrap cdk ..."
if [[ ! -z "$PROFILE" ]]; then
  npm run cdk bootstrap $AWS_ACCOUNT/$AWS_REGION -- --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --profile $PROFILE
else
  npm run cdk bootstrap $AWS_ACCOUNT/$AWS_REGION -- --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
fi
echo "------------------------------"
echo "done"
