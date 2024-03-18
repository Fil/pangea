## On vercel, ignore commits on the sane branch
## see https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel
## and https://github.com/orgs/vercel/discussions/1339
if [ "$VERCEL_GIT_COMMIT_REF" == "sane" ]; then exit 0; else exit 1; fi