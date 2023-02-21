#!/bin/bash
BRANCH="stage"
if [[ "$BRANCH" != "" ]];
then
  git reset --hard HEAD
  echo "Done hard reset code."
  git checkout $BRANCH
  echo "Done switch branch."
  git pull origin $BRANCH
  echo "Done pull from $BRANCH."
  yarn --ignore-engines
  echo "Done Engine Ignore."
  yarn install
  echo "Done installation."
  yarn format:fix
  yarn lint:fix
  echo "Done code format"
  yarn build
  echo "Done generated stage build."
else
   echo "Please provide branch name."
fi
