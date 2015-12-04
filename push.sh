#!/bin/bash
rsync -r --update --progress --delete -v . pi@192.168.1.78:/home/pi/Project/ --exclude="*.git"
