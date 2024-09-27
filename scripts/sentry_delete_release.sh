#!/bin/sh
# format code by `shfmt -l -w -ln=bash {script_filename.sh}`

VERSION=""
while getopts "v:h" optname; do
	case "$optname" in
	"v")
		VERSION=$OPTARG
		echo "get option -v(version), value is $VERSION"
		;;
	"h")
		echo "usage: ./sentry_delete_release.sh [-h] [-v {release version}]"
		echo "positional arguments:"
		echo "  -v      release version to delete"
		echo "  -h      Show this help message and exit"
		exit
		;;
	esac
done

if [ -z "$VERSION" ]; then
	echo "release versoin is required"
	exit 1
fi

SCRIPT_DIR="$(realpath "$(dirname "$BASH_SOURCE")")"
ROOT_DIR=$SCRIPT_DIR
while [[ $ROOT_DIR != *"/vue3-sample" ]]; do
	PARENT_DIR="$(dirname $ROOT_DIR)"
	if [[ $PARENT_DIR == $ROOT_DIR ]]; then
		echo "cannot find infra folder. script path: $SCRIPT_PATH"
		exit 1
	fi
	ROOT_DIR=$PARENT_DIR
done

echo "enter infra root folder: $ROOT_DIR"
cd $ROOT_DIR

set -a
source .env.sentry-build-plugin
set +a

curl "https://sentry.io/api/0/organizations/$SENTRY_ORG/releases/$VERSION/" \
	-H "Authorization: Bearer $SENTRY_API_AUTH_TOKEN" \
	-X DELETE
echo "done"
