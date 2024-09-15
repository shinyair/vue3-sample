#!/bin/sh
# -p profile
# -c code required
# -h help
#
# format code by shfmt

set -e

AWS_CLI_VERION=$(aws --version)

if [ $? -ne 0 ]; then
  echo "aws cli is not installed; exit"
  exit 1
else
  echo "using aws cli: $AWS_CLI_VERION"
fi

PROFILE=""
CODE=""
while getopts "p:c:h" optname; do
  case "$optname" in
  "p")
    PROFILE=$OPTARG
    echo "get option -p(profile), value is $PROFILE"
    ;;
  "c")
    CODE=$OPTARG
    echo "get option -c(mfa code),value is $CODE"
    ;;
  "h")
    echo "usage: ./aws_cli_token_generator.sh [-h] [-p {profile name}] [-c {mfacode}]"
    echo "positional arguments:"
    echo "  -p      AWS Credential Profile used in cli commands"
    echo "  -c      Multi-factor authentication (MFA) code"
    echo "  -h      Show this help message and exit"
    exit
    ;;
  esac
done

if [ -z "$CODE" ]; then
  echo "MFA code is required"
  exit 1
fi

SESSION_PROFILE="default"
if [[ ! -z "$PROFILE" ]]; then
  export AWS_PROFILE=$PROFILE
  SESSION_PROFILE="${PROFILE}_default"
fi

AWS_IAM_USER_REGION=$(aws configure get region)
AWS_IAM_USER_ARN=$(aws sts get-caller-identity --query Arn --output text)
if [ -z "$AWS_IAM_USER_ARN" ]; then
  exit 1
fi

# AWS_IAM_USER_ARN="arn:aws:iam::${ACCOUNT}:user/${IAM_USER_NAME}"
# AWS_IAM_MFA_ARN="arn:aws:iam::${ACCOUNT}:mfa/${IAM_USER_NAME}"
AWS_IAM_MFA_ARN="${AWS_IAM_USER_ARN/user/mfa}"
AWS_STS_RESULT=$(aws sts get-session-token --duration-seconds 129600 \
  --serial-number $AWS_IAM_MFA_ARN \
  --token-code $CODE \
  --output text)
read AWS_RETURN_TYPE AWS_ACCESS_KEY_ID AWS_EXPIRATION AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN <<<$AWS_STS_RESULT
if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "no AWS_ACCESS_KEY_ID found in sts result"
  exit 1
fi
if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "no AWS_SECRET_ACCESS_KEY found in sts result"
  exit 1
fi
if [ -z "$AWS_SESSION_TOKEN" ]; then
  echo "no AWS_SESSION_TOKEN found in sts result"
  exit 1
fi

echo "---------------"
echo "ArnMFA:          $AWS_IAM_MFA_ARN"
echo "Region:          $AWS_IAM_USER_REGION"
echo "SessionProfile:  $SESSION_PROFILE"
echo "AccessKeyId:     $AWS_ACCESS_KEY_ID"
echo "SecretAccessKey: $AWS_SECRET_ACCESS_KEY"
echo "SessionToke:     $AWS_SESSION_TOKEN"
echo "Expiration:      $AWS_EXPIRATION"
echo "---------------"

echo "updating credentials of $SESSION_PROFILE"
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID" --profile $SESSION_PROFILE
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY" --profile $SESSION_PROFILE
aws configure set aws_session_token "$AWS_SESSION_TOKEN" --profile $SESSION_PROFILE
aws configure set region "$AWS_IAM_USER_REGION" --profile $SESSION_PROFILE
echo "done"
