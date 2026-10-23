#! /bin/bash

git config http.sslVerify false
git push r2d2 main
git config --unset http.sslVerify
