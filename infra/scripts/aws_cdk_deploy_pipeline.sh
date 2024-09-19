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

STAGE=""
PROFILE=""
while getopts "s:p:h" optname; do
  case "$optname" in
  "s")
    STAGE=$OPTARG
    echo "get option -s(stage), value is $STAGE"
    ;;
  "p")
    PROFILE=$OPTARG
    echo "get option -p(profile), value is $PROFILE"
    ;;
  "h")
    echo "usage: ./aws_cdk_deploy_pipeline.sh [-h] [-p {profile name}]"
    echo "positional arguments:"
    echo "  -s      Stage to deploy"
    echo "  -p      AWS Credential Profile used in commands"
    echo "  -h      Show this help message and exit"
    exit
    ;;
  esac
done

if [ -z "$STAGE" ]; then
  echo "stage is required"
  exit 1
else
  export STAGE=$STAGE
fi

SCRIPT_DIR="$(realpath "$(dirname "$BASH_SOURCE")")"
ROOT_DIR=$SCRIPT_DIR
while [[ $ROOT_DIR != *"/infra" ]]; do
  PARENT_DIR="$(dirname $ROOT_DIR)"
  if [[ $PARENT_DIR == $ROOT_DIR ]]; then
    echo "cannot find infra folder. script path: $SCRIPT_PATH"
    exit 1
  fi
  ROOT_DIR=$PARENT_DIR
done

echo "enter infra root folder: $ROOT_DIR"
cd $ROOT_DIR

echo "install infra ..."
pipenv install
npm install
npm run cdk:clear

if [[ ! -z "$PROFILE" ]]; then
  echo "cdk synth pipeline stack ..."
  npm run cdk synth -- --app "python ./src/app_pipeline.py" --profile $PROFILE
  echo "cdk deploy pipeline stack ..."
  npm run cdk deploy -- --app "python ./src/app_pipeline.py" --profile $PROFILE
else
  echo "cdk synth pipeline stack ..."
  npm run cdk synth -- --app "python ./src/app_pipeline.py"
  echo "cdk deploy pipeline stack ..."
  npm run cdk deploy -- --app "python ./src/app_pipeline.py"
fi

echo "done"
