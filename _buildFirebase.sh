#! /bin/bash

clear
printf "\n======================================================\n"
printf   "RUNNING PIPELINE TO DEPLOY TO FIREBASE"
printf "\n======================================================\n"

printf "\n=========================\n"
printf "Rebuild dist directories"
printf "\n=========================\n"
rm -rf dist
rm -rf ./firebase-serve/dist

printf "\n=========================\n"
printf "Build bundles"
printf "\n=========================\n"
sh _buildRemote.sh

printf "\n=========================\n"
printf "Copy bundles to ./firebase-serve"
printf "\n=========================\n"
cp -r ./dist ./firebase-serve/dist

if [ $# -ge 1 ] ;then
  printf "\n=========================\n"
  printf   "Deploying to firebase"
  printf "\n=========================\n"
  cd firebase-serve
  firebase deploy
  cd ..
fi