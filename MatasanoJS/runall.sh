#!/bin/bash

ChallengeDirs=$(ls -d *challenges/Set*)
for dir in $ChallengeDirs; do
    #echo $dir
    challenges=$(ls -1A $dir | grep *.js)
    echo $challenges
done